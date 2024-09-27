import { useContext } from 'react'
import './OperationCard.css'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'
import { getDate } from '../../helpers/date'

const OperationCard = ({ operation }) => {
  return (
    <div className='operation__container-operation'>
      <div>
        <p
          className='operation__get-result-paid'
          style={{
            backgroundColor:
              operation.paid.paid === 'pending'
                ? 'var(--rb-bg-register)'
                : operation.paid.paid === 'completed'
                ? 'var(--rb-bg-green)'
                : operation.paid.paid === 'cancelled' &&
                  'var(--rb-bg-secondary)'
          }}
        >
          {operation.paid.paid === 'pending'
            ? 'Pendiente de pago'
            : operation.paid.paid === 'completed'
            ? 'Pagado'
            : operation.paid.paid === 'cancelled' && 'Anulado'}
        </p>
      </div>
      <div className='operation__contain-card'>
        <div>
          <p>Iniciado por:</p>
          <p className='operation__get-result'>
            {operation.id_user.name + ' ' + operation.id_user.lastname}
          </p>
        </div>
        <div>
          <p>¿Cuándo?</p>
          <p className='operation__get-result'>
            {getDate(operation.transaction_date)}
          </p>
        </div>
        <div>
          <p>Se cierra el</p>
          <p className='operation__get-result'>
            {getDate(operation.updatedAt)}
          </p>
        </div>
        <div>
          <p>Box:</p>
          <p className='operation__get-result'>{operation.id_box.name_box}</p>
        </div>
        <div>
          <p>Cantidad canjeada:</p>
          <p className='operation__get-result'>{operation.consumed}</p>
        </div>
        <div>
          <p>Importe:</p>
          <p className='operation__get-result'>{operation.amount}€</p>
        </div>
        <div>
          <p>Resultado:</p>
          <p
            className={`operation__get-result ${
              operation.status.includes('completed') ? 'green' : 'cancelled'
            }`}
          >
            {operation.status.includes('completed') ? 'Aprobado' : 'Cancelado'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OperationCard
