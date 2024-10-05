const Box = require('../../models/box.model/box.model')
const {
  updateUserBox,
  updateBoxItemsAcquired,
  getUserDetails,
  addUserBox
} = require('./helpers/box.helpers')

const newBox = async (req, res, next) => {
  const { user } = req
  try {
    const box = new Box({
      ...req.body,
      usage_limit: req.body.items_included + req.body.bonus_items,
      creator: user._id
    })
    await box.save()
    return res
      .status(201)
      .json({ message: 'Nuevo box creado correctamente.', box })
  } catch (error) {
    next(error)
  }
}

const getBoxes = async (req, res, next) => {
  try {
    const boxes = await Box.find()
    return res.status(200).json({
      message: `${boxes.length === 0 ? 'No hay boxes disponibles.' : `Boxes`}`,
      boxes
    })
  } catch (error) {
    next(error)
  }
}

const updateBox = async (req, res, next) => {
  const { box } = req
  try {
    const updateBox = await Box.findByIdAndUpdate(
      box._id,
      { $set: req.body },
      { new: true }
    )
    if (!updateBox)
      return res.status(409).json({ message: 'Box no encontrado.' })
    return res
      .status(201)
      .json({ message: 'Box actualizado correctamente.', updateBox })
  } catch (error) {
    next(error)
  }
}

const removeBox = async (req, res, next) => {
  const { box } = req
  try {
    const isAcquired = await Box.findById(box._id)
    if (!isAcquired.items_acquired_by.length) {
      const remove = await Box.findByIdAndDelete(box._id)
      if (!remove) {
        return res.status(409).json({ message: 'Box no encontrado.' })
      }
      return res.status(200).json({ message: 'Box eliminado correctamente.' })
    } else {
      return res.status(409).json({
        message:
          'Box no puede ser eliminado porque ha sido adquirido. Puedes cambiar su estado a inactivo para detener las ventas'
      })
    }
  } catch (error) {
    next(error)
  }
}

const buyBox = async (req, res, next) => {
  const { user } = req
  const { box } = req
  try {
    const isActiveBox = await Box.findById(box._id).select('status')
    if (!isActiveBox || isActiveBox.status.includes('inactive')) {
      return res.status(409).json({
        message: 'Box inactivo, no es posible continuar con la operación.'
      })
    }
    const userBoxIndex = user.purchasedBoxes.findIndex(
      (userBox) => userBox.box.toString() === box._id.toString()
    )
    if (userBoxIndex !== -1) {
      await updateUserBox(user._id, box._id, box.usage_limit)
      await updateBoxItemsAcquired(box._id, user._id)
      const updatedUser = await getUserDetails(user._id)
      return res.status(201).json({
        message: 'Compra realizada correctamente. Tu box se ha actualizado',
        updatedUser
      })
    } else {
      await addUserBox(user._id, box._id, box.usage_limit)
      await updateBoxItemsAcquired(box._id, user._id)
      const updatedUser = await getUserDetails(user._id)
      return res
        .status(201)
        .json({ message: 'Nuevo box adquirido correctamente.', updatedUser })
    }
  } catch (error) {
    next(error)
  }
}

const buyBoxCart = async (req, res) => {
  const { exist, no_exist, inactive, user } = req

  if (no_exist.length > 0) {
    return res
      .status(404)
      .json({ message: 'Algunos Boxes ya no existen.', no_exist })
  }

  if (inactive.length > 0) {
    return res
      .status(409)
      .json({ message: 'Algunos Boxes están inactivas.', inactive })
  }

  try {
    for (const box of exist) {
      const userBoxIndex = user.purchasedBoxes.findIndex(
        (userBox) => userBox.box.toString() === box._id.toString()
      )
      if (userBoxIndex !== -1) {
        await updateUserBox(user._id, box._id, box.usage_limit * box.quantity)
      } else {
        await addUserBox(user._id, box._id, box.usage_limit * box.quantity)
      }
      await updateBoxItemsAcquired(box._id, user._id)
    }
    const updatedUser = await getUserDetails(user._id)
    const boxes = await Box.find()
    return res.status(201).json({
      message: 'Compra realizada correctamente. Las cajas se han actualizado.',
      updatedUser, boxes
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  newBox,
  getBoxes,
  updateBox,
  removeBox,
  buyBox,
  buyBoxCart
}
