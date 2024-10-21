const Partner = require('../../models/partner.model/partner.model')
const Comment = require('../../models/reviews.model/comment.model')
const Reply = require('../../models/reviews.model/reply.model')

const getComments = async (req, res) => {
  //!CREAR PAGINACION QUERY
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
    const newComment = new Comment({
      content,
      idUser: user._id,
      idPartner
    })
    await newComment.save()
    const comment = await Comment.findById(newComment._id).populate({
      path: 'idUser',
      select: 'name avatar'
    })
    return res
      .status(201)
      .json({ message: 'Comentario creado correctamente', comment })
  } catch (error) {
    next(error)
  }
}

const newReply = async (req, res) => {
  const { idComment } = req.params
  const { user } = req
  const { content } = req.body

  try {
    const updateComment = await Comment.findByIdAndUpdate(
      idComment,
      {
        $inc: { replies: 1 }
      },
      { new: true }
    )
    if (!updateComment) {
      return res.status(404).json({ message: 'No existe dicho comentario.' })
    }
    const newReply = new Reply({
      idUser: user._id,
      idComment,
      content
    })
    await newReply.save()
    const reply = await Reply.findById(newReply._id).populate({
      path: 'idUser',
      select: 'name avatar'
    })
    const comment = await Comment.findById(updateComment._id).populate({
      path: 'replies.idUser',
      select: 'name avatar'
    })

    res.status(201).json({ message: 'Post respondido.', comment, reply })
  } catch (error) {
    next(error)
  }
}

const getReplies = async (req, res, next) => {
  const { idComment } = req.params
  try {
    const existComment = await Comment.findById(idComment)
    if (!existComment) {
      return res
        .status(404)
        .json({ message: 'El comentario que intentas responder ya no existe.' })
    }
    const replies = await Reply.find()
      .where('idComment')
      .equals(existComment._id)
      .populate({ path: 'idUser', select: 'name avatar' })
    return res.status(200).json(replies)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getComments,
  newComment,
  newReply,
  getReplies
}
