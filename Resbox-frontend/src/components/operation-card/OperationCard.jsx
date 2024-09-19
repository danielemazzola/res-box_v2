import { useContext } from 'react'
import './OperationCard.css'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'
import { getDate } from '../../helpers/date'

const OperationCard = ({ operations }) => {
  console.log(operations)

  const { refOperations } = useContext(ScrollRefContext)
  return (
    <div ref={refOperations} className='operation__container-operations fadeIn'>
      <div className='operation__operations-title'>
        <h3>Mis operaciones</h3>
        <p>Descubre las 10 últimas operaciones finalizadas.</p>
      </div>
      <div className='operation__operations-card'>
        {operations
          .filter((operation) => operation.status.includes('completed'))
          .map((operation, index) => (
            <div key={index}>
              <div>
                <p>Fecha operación:</p>
                <p className='operation__get-result'>{getDate(operation.transaction_date)}</p>
              </div>
              <div>
                <p>Box:</p>
                <p className='operation__get-result'>{operation.id_box.name_box}</p>
              </div>
              <div>
                <p>Usuario:</p>
                <p className='operation__get-result'>
                  {operation.id_user.name + ' ' + operation.id_user.lastname}
                </p>
              </div>
              <div>
                <p>Cantidad:</p>
                <p className='operation__get-result'>{operation.consumed}</p>
              </div>

              <div>
                <p>Resultado:</p>
                <p className='operation__get-result'>{operation.status}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default OperationCard
