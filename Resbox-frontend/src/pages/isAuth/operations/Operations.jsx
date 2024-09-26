import { useContext, useEffect } from 'react'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import OperationCard from '../../../components/operation-card/OperationCard'
import { AuthContext } from '../../../context/auth/AuthContext'
import './Operations.css'


const Operations = () => {
  const {
    statePartners: { operations }
  } = useContext(ReducersContext)

  const { handleOperations } = useContext(AuthContext)

  useEffect(() => {
    handleOperations()
  }, [])

  return (
    <div className='operations-component__container'>
      <div className='operations-component__title'>
        <h2>Mis operaciones</h2>
      </div>
      <div className='operations-content__status-operation'></div>
      {operations
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 10)
        .map((operation, index) => (
          <OperationCard key={index} operation={operation} />
        ))}
    </div>
  )
}

export default Operations
