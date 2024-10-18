import { useNavigate } from 'react-router-dom'
import './BtnGoBack.css'
const BtnGoBack = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  return (
    <button onClick={handleBack} className='btn-go-back'>Atrás</button>
  )
}

export default BtnGoBack