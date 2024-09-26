const { createTokenOperation } = require('../../helpers/createToken')
const Box = require('../../models/box.model/box.model')
const Operation = require('../../models/operation.model/operation.model')
const User = require('../../models/user.model/user.model')

const newOperation = async (req, res, next) => {
  const { user } = req
  const { consumed } = req.body
  const { id_box } = req.params

  try {
    const userBox = user.purchasedBoxes.find(
      (arr) => arr.box.toString() === id_box.toString()
    )
    const box = await Box.findById(id_box)
    if (!userBox) {
      return res.status(404).json({
        message: `No puedes acceder a este box.`
      })
    }
    if (userBox.remainingItems === 0) {
      return res.status(400).json({
        message: `Has excedido el límite.`
      })
    }
    if (consumed > userBox.remainingItems) {
      return res.status(400).json({
        message: `La cantidad a canjear es superior a los disponibles.`
      })
    }
    const itemCost = box.price / (box.items_included + box.bonus_items)
    const token = createTokenOperation()
    const newOperation = new Operation({
      id_user: user._id,
      id_box: id_box,
      consumed,
      amount: itemCost * consumed,
      secure_token: token
    })
    await newOperation.save()
    userBox.remainingItems -= consumed
    await user.save()
    return res.status(201).json({
      message: `Muestra este codigo en tu establecimiento favorito.`,
      token
    })
  } catch (error) {
    next(error)
  }
}

const updateOperation = async (req, res, next) => {
  const { operation } = req
  const { partner } = req
  const { status } = req.body
  try {
    let updatedOperation
    let updatePurchased
    const user = await User.findById(operation.id_user)
    updatePurchased = user.purchasedBoxes.find(
      (arr) => arr.box.toString() === operation.id_box.toString()
    )
    if (status.includes('completed')) {
      const box = await Box.findById(operation.id_box)
      if (!box) {
        return res.status(404).json({ message: 'Box no encontrado.' })
      }
      updatedOperation = await Operation.findByIdAndUpdate(
        operation._id,
        {
          id_partner: partner._id,
          secure_token: '',
          status: 'completed'
        },
        { new: true }
      )
      if (!updatedOperation)
        return res.status(409).json({
          message: `Algo a salido mal. Por favor contacta con nuestro soporte con el codigo de canje: ${operation.secure_token}`
        })
      updatePurchased.id_partner_consumed.push(partner._id)
      await user.save()
      const putOperation = await Operation.findById(operation._id)
        .populate({
          path: 'id_box',
          select: 'name_box'
        })
        .populate({
          path: 'id_user',
          select: 'name lastname'
        })
      return res.status(201).json({
        message:
          'Operación finalizada con éxito. Gracias por confiar en Res-Box',
        putOperation
      })
    } else if (status.includes('cancelled')) {
      updatedOperation = await Operation.findByIdAndUpdate(
        operation._id,
        {
          id_partner: partner._id,
          secure_token: '',
          status: 'cancelled'
        },
        { new: true }
      )
      if (!updatedOperation)
        return res.status(409).json({
          message: `Algo a salido mal. Por favor contacta con nuestro soporte con el codigo de canje: ${operation.secure_token}`
        })

      updatePurchased.remainingItems += updatedOperation.consumed
      await user.save()
      const putOperation = await Operation.findById(operation._id)
        .populate({
          path: 'id_box',
          select: 'name_box'
        })
        .populate({
          path: 'id_user',
          select: 'name lastname'
        })

      return res
        .status(201)
        .json({ message: 'Operación cancelada.', putOperation })
    } else if (!status.includes('cancelled', 'finish'))
      return res
        .status(409)
        .json({ message: 'Algo salió mal, por favor refresque la ventana.' })
  } catch (error) {
    next(error)
  }
}

const getOperationBuyPartner = async (req, res, next) => {
  const { user } = req

  try {
    const operations = await Operation.find()
      .where('id_partner')
      .equals(user.idPartner)
      .populate({
        path: 'id_box',
        select: 'name_box'
      })
      .populate({
        path: 'id_user',
        select: 'name lastname'
      })
    if (operations.length < 0) {
      return res
        .status(409)
        .json({ message: 'No has realizado operaciones de canje.' })
    } else {
      return res.status(200).json({
        message: 'Operaciones cargadas de forma correcta.',
        operations
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  newOperation,
  updateOperation,
  getOperationBuyPartner
}
