const { generateJWT } = require('../../config/jwt/jwt')
const User = require('../../models/user.model/user.model')
const Partner = require('../../models/partner.model/partner.model')
const bcrypt = require('bcrypt')
const { deleteImg } = require('../../helpers/delete.avatar')
const { createToken } = require('../../helpers/createToken')
const {
  newUserEmail,
  recoverEmail,
  newPasswordEmail
} = require('./mails/send.mails')

const getUsers = async (req, res) => {
  try {
    const users = await User.countDocuments()
    return res
      .status(200)
      .json({ message: 'Todoso los usuarios resgistrados', users })
  } catch (error) {
    console.log(error)
  }
}

const newUser = async (req, res, next) => {
  const email = req.body.email.toLowerCase()
  try {
    const createUser = new User({ ...req.body, email })
    await createUser.save()
    await newUserEmail(createUser)
    const user = await User.findById({ _id: createUser._id }).select(
      '-password'
    )
    return res
      .status(200)
      .json({ message: 'Usuario registrado correctamente', user })
  } catch (error) {
    next(error)
  }
}

const authGoogle = async (req, res) => {
  const { id_token } = req.body
  try {
    const userInfoResponse = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${id_token.access_token}`
        }
      }
    )
    const userInfo = await userInfoResponse.json()
    const { email, name, picture, sub } = userInfo
    let user_google = await User.findOne({ email })
    if (!user_google) {
      const names = name.split(' ')
      const firstname = names[0] || ''
      const lastname = names.slice(1).join(' ') || ''

      user_google = new User({
        name: firstname,
        lastname,
        email,
        password: sub,
        avatar: picture,
        token: null
      })
      await user_google.save()
      await newUserEmail(user_google)
    }
    const user = await getUserWithPopulates(user_google._id)
    const token = generateJWT(user._id)
    res.status(200).json({
      user,
      token
    })
  } catch (error) {
    console.error(
      'Error verificando el token o obteniendo información del usuario:',
      error
    )
    res.status(401).json({
      success: false,
      message: 'Token inválido o error al obtener información del usuario.'
    })
  }
}

const login = async (req, res, next) => {
  const { password } = req.body
  try {
    if (bcrypt.compareSync(password, req.user.password)) {
      const token = generateJWT(req.user._id)
      const user = await getUserWithPopulates(req.user._id)
      return res.status(200).json({ user, token })
    } else {
      return res.status(409).json({ message: 'Contraseña incorrecta.' })
    }
  } catch (error) {
    next(error)
  }
}

const profile = async (req, res, next) => {
  const user = await getUserWithPopulates(req.user._id)
  try {
    return res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

const recoverPassword = async (req, res, next) => {
  const { user } = req
  try {
    user.token = createToken()
    await user.save()
    await recoverEmail(user)
    return res.status(200).json({
      message: 'Te hemos enviado un email, por favor siga las instrucciones.'
    })
  } catch (error) {
    next(error)
  }
}

const putPassword = async (req, res, next) => {
  const { user } = req
  const { password } = req.body
  try {
    user.password = password
    user.token = ''
    await user.save()
    await newPasswordEmail(user)
    return res
      .status(200)
      .json({ message: 'Nueva password guardada correctamente.' })
  } catch (error) {
    next(error)
  }
}

const updateAvatar = async (req, res, next) => {
  const { user } = req
  try {
    if (req.file) {
      deleteImg(user.avatar)
      req.body.image = req.file.path
    }
    const avatar = await User.findByIdAndUpdate(
      user._id,
      { $set: { avatar: req.body.image } },
      { new: true }
    )
      .select('-password -__v -token')
      .populate({
        path: 'purchasedBoxes.box',
        select:
          'name_box description items_included bonus_items price status createdAt updatedAt'
      })
      .populate({
        path: 'purchasedBoxes.id_partner_consumed'
      })
    return res.status(200).json({ message: 'Avatar actualizado.', avatar })
  } catch (error) {
    next(error)
  }
}

const addFavorite = async (req, res, next) => {
  const { idPartner } = req.params
  const { user } = req

  try {
    const partner = await Partner.findById(idPartner)
    if (!partner) {
      return res.status(404).json({
        message:
          'No existe el colaborador o hubo un problema. Por favor actualiza la página.'
      })
    }
    if (partner.favorite === undefined || partner.favorite === null) {
      partner.favorite = 0
    }
    const isFavorite = user?.favorites.find(
      (favorite) => favorite.toString() === idPartner.toString()
    )
    if (isFavorite) {
      user.favorites.pull(idPartner)
      await user.save()
      const updatePartner = await Partner.findByIdAndUpdate(
        idPartner,
        {
          $inc: { favorite: -1 }
        },
        { new: true }
      )
      const favorites = await getUserWithPopulates(user._id)
      return res.status(201).json({
        message: 'Eliminado de mis favoritos.',
        favorites,
        updatePartner
      })
    } else {
      if (!Array.isArray(user.favorites)) {
        user.favorites = []
      }
      user.favorites.push(partner._id)
      await user.save()
      const updatePartner = await Partner.findByIdAndUpdate(
        idPartner,
        {
          $inc: { favorite: 1 }
        },
        { new: true }
      )
      const favorites = await getUserWithPopulates(user._id)
      return res.status(201).json({
        message: 'Guardado en mis favoritos.',
        favorites,
        updatePartner
      })
    }
  } catch (error) {
    next(error)
  }
}

const getUserWithPopulates = async (userId) => {
  return await User.findById(userId)
    .select('-password')
    .populate({
      path: 'purchasedBoxes.box',
      select:
        'name_box description items_included bonus_items price status createdAt updatedAt'
    })
    .populate({
      path: 'purchasedBoxes.id_partner_consumed',
      populate: {
        path: 'users',
        select: 'name avatar'
      }
    })
    .populate('idPartner')
}

module.exports = {
  getUsers,
  newUser,
  authGoogle,
  login,
  profile,
  recoverPassword,
  putPassword,
  updateAvatar,
  addFavorite
}
