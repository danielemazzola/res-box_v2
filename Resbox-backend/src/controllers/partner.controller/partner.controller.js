let fs = require('fs')
const xlsx = require('xlsx')
const Partner = require('../../models/partner.model/partner.model')
const { deleteImg } = require('../../helpers/delete.avatar')

const newPartnerFile = async (req, res, next) => {
  let duplicateEmail = []
  try {
    const filePath = req.file.path
    const reedFilePath = xlsx.readFile(filePath)
    const name_list_file = reedFilePath.SheetNames
    const dataFile = xlsx.utils.sheet_to_json(
      reedFilePath.Sheets[name_list_file[0]]
    )
    const processFile = async (partner) => {
      const { email } = partner
      try {
        const existPartner = await Partner.findOne({ email })
        if (!existPartner) {
          const newPartner = new Partner({
            name: partner.name,
            cif: partner.cif,
            owner_name: partner.owner_name,
            owner_lastname: partner.owner_lastname,
            phone: partner.phone,
            email: partner.email,
            bank_name: partner.bank_name,
            bank_number: partner.bank_number,
            city: partner.city,
            address: partner.address,
            coordinate_x: partner.coordinate_x,
            coordinate_y: partner.coordinate_y
          })
          await newPartner.save()
        } else {
          duplicateEmail.push(email)
        }
      } catch (error) {
        next(error)
      }
    }
    await Promise.all(dataFile.map(processFile))
    res.status(201).json({
      message: 'Archivo procesado correctamente',
      duplicate: duplicateEmail
    })
  } catch (error) {
    next(error)
  } finally {
    fs.unlink(req.file.path, (error) => {
      if (error) {
        next(error)
      }
    })
  }
}

const newPartner = async (req, res, next) => {
  const { user } = req
  const email = req.body.email.toLowerCase()
  try {
    const exist = await Partner.findOne({ email })
    if (exist) {
      return res.status(409).json({
        message:
          'El email ya existe, debe esperar a ser activado el establecimiento.'
      })
    } else {
      const newPartner = new Partner({
        ...req.body,
        email,
        users: [user._id]
      })
      await newPartner.save()
      user.idPartner = newPartner._id
      user.roles.push('partner', 'admin')
      await user.save()
      const partner = await Partner.findById(newPartner._id).populate({
        path: 'users',
        select: '_id name lastname email avatar roles'
      })
      return res.status(201).json({
        message:
          'Partner registrado correctamente, tu perfil a cambiado los roles',
        partner,
        user
      })
    }
  } catch (error) {
    next(error)
  }
}

const getPartners = async (req, res, next) => {
  try {
    const partners = await Partner.find()
    return res.status(200).json({
      message: `${
        partners.length === 0 ? 'No hay partners vinculados.' : `Partners`
      }`,
      partners
    })
  } catch (error) {
    next(error)
  }
}

const getPartner = async (req, res, next) => {
  const { id_partner } = req.params  
  try {
    const partner = await Partner.findById(id_partner).populate({
      path: 'users',
      select: '_id name lastname email avatar roles'
    })
    if (!partner)
      return res.status(404).json({
        message:
          'El usuario no tiene asignado un colaborador, por favor contacta con soporte.'
      })
    return res.status(200).json({
      message: 'Partner',
      partner
    })
  } catch (error) {
    next(error)
  }
}

const updatAvatar = async (req, res, next) => {
  const { user } = req
  const { partner } = req
  try {
    const existUserInPartner = partner.users.some(
      (idUser) => idUser.toString() === user._id.toString()
    )
    if (!existUserInPartner) {
      return res
        .status(401)
        .json({ message: 'No tienes permisos para realizar estos cambios.' })
    } else {
      if (req.file) {
        deleteImg(partner.avatar)
        req.body.image = req.file.path
      }
      const updatePartner = await Partner.findByIdAndUpdate(
        partner._id,
        { $set: { avatar: req.body.image } },
        { new: true }
      )
      const getPartner = await Partner.findById(updatePartner._id).populate({
        path: 'users',
        select: '_id name lastname email avatar roles'
      })
      return res.status(200).json({ message: 'Avatar actualizado.', getPartner })
    }
  } catch (error) {
    next(error)
  }
}

const updateBanner = async (req, res, next) => {
  const { user } = req
  const { partner } = req
  try {
    const existUserInPartner = partner.users.some(
      (idUser) => idUser.toString() === user._id.toString()
    )
    if (!existUserInPartner) {
      return res
        .status(401)
        .json({ message: 'No tienes permisos para realizar estos cambios.' })
    } else {
      if (req.file) {
        deleteImg(partner.banner)
        req.body.image = req.file.path
      }
      const updatePartner = await Partner.findByIdAndUpdate(
        partner._id,
        { $set: { banner: req.body.image } },
        { new: true }
      )
      const getPartner = await Partner.findById(updatePartner._id).populate({
        path: 'users',
        select: '_id name lastname email avatar roles'
      })
      return res
        .status(200)
        .json({ message: 'Banner actualizado.', getPartner })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  newPartnerFile,
  getPartners,
  getPartner,
  newPartner,
  updatAvatar,
  updateBanner
}
