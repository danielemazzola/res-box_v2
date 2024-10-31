import './OperationCard.css'
import { getDate } from '../../helpers/date'
import { formatCash } from '../../pages/isAuth/operations/herlpers'

const OperationCard = ({ operation }) => {
  
  return (
    <div className='operation__container-operation'>
      
      <div className='operation__contain-card'>
        <div>
          <p>Box</p>
          <p>{operation.id_box.name_box}</p>
        </div>
        <div>
          <p>Cliente</p>
          <p>{operation.id_user.name + ' ' + operation.id_user.lastname}</p>
        </div>
        <div>
          <p>Fecha inicio</p>
          <p>{getDate(operation.transaction_date)}</p>
        </div>
        <div>
          <p>fecha cierre</p>
          <p>{getDate(operation.updatedAt)}</p>
        </div>

        <div>
          <p>Cantidad</p>
          <p>{operation.consumed}</p>
        </div>
        <div>
          <p>Importe:</p>
          <p>{formatCash(operation.amount)}</p>
        </div>
        <div>
        <p>Resultado</p>
          {operation.status.includes('completed') ? (
            <p className='green' style={{color:'white'}}>OK</p>
          ) : (
            <p className='cancelled' style={{color:'white'}}>KO</p>
          )}
        </div>
        <div className='operation__content-result'>
        <p
          className='operation__get-result-paid'
          style={{
            backgroundColor:
              operation.paid.paid === 'pending'
                ? 'var(--rb-bg-register)'
                : operation.paid.paid === 'completed'
                ? 'var(--rb-bg-green)'
                : operation.paid.paid === 'cancelled' &&
                  'var(--rb-text-cancel)'
          }}
        >
          {operation.paid.paid === 'pending'
            ? 'Pendiente de pago'
            : operation.paid.paid === 'completed'
            ? 'Pagado'
            : operation.paid.paid === 'cancelled' && 'Anulado'}
        </p>
        <p
          className='operation__get-result-invoice'
          title='Orden número'
        >
          Op. {operation.invoice_number}
        </p>
      </div>
      </div>
    </div>
  )
}

export default OperationCard
