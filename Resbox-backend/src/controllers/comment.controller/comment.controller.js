const Partner = require('../../models/partner.model/partner.model')
const Comment = require('../../models/reviews.model/reviews.model')

const getComments = async (req, res) => {
  const { idPartner } = req.params
  const comments = await Comment.find()
    .where('idPartner')
    .equals(idPartner)
    .populate({
      path: 'idUser',
      select: 'name avatar'
    })
  const partner = await Partner.findById(idPartner)
    .select('-bank_name -bank_number -owner_lastname -owner_name')
    .populate({
      path: 'users',
      select: 'avatar name'
    })

  return res
    .status(200)
    .json({ message: 'Todos los comentarios', partner, comments })
}
const newComment = async (req, res, next) => {
  const { user } = req
  const { idPartner } = req.params
  const { content } = req.body

  try {
    const existPartner = await Partner.findById(idPartner)
    if (!existPartner) {
      return res.status(409).json({ message: 'Colaborador no existe.' })
    }
    const comment = await Comment.findOne({
      idUser: user._id,
      idPartner
    })
    if (comment) {
      return res.status(400).json({ message: 'Ya has comentado este partner.' })
    }
    const newComment = new Comment({ content, idUser: user._id, idPartner })
    await newComment.save()
    return res
      .status(201)
      .json({ message: 'Comentario creado correctamente', newComment })
  } catch (error) {
    next(error)
  }
}

const replyComment = async (req, res) => {
  const { idComment } = req.params
  const { user } = req
  const { content } = req.body

  try {
    const comment = await Comment.findById(idComment)
    if (!comment) {
      return res.status(404).json({ message: 'No existe dicho comentario.' })
    }
    const existingReply = comment.replies.find((reply) =>
      reply.idUser.equals({ idUser: user._id })
    )
    if (existingReply) {
      return res
        .status(400)
        .json({ message: 'Ya has respondido a este comentario.' })
    }
    comment.replies.push({ content, idUser: user._id })
    await comment.save()
    res.status(201).json(comment)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getComments,
  newComment,
  replyComment
}
