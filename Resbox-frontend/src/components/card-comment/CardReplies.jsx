import { getDate } from '../../helpers/date'
import './CardReplies.css'

const CardReplies = ({ reply }) => {
  return (
    <div className='comment__content'>
      <div className='comment__container-info-user'>
        <div>
          <img src={reply.idUser.avatar} alt={reply.idUser.name} />
          <i>{reply.idUser.name}</i>
        </div>
        <p>{getDate(reply.createdAt)}</p>
      </div>
      <div>
        <p>{reply.content}</p>
      </div>
    </div>
  )
}

export default CardReplies
