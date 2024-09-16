import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../../components/modal/Modal'
import Form from '../../components/form-group/Form'

const RecoveryPassword = () => {
  const [openFormRecovery, setOpenFormRecovery] = useState(true)
  const navigate = useNavigate()
  const closeModal = () => {
    setOpenFormRecovery(false)
    setTimeout(() => {
      navigate('/')
    }, 500)
  }
  return (
    <Modal isModalOpen={openFormRecovery} handleCloseModal={closeModal}>
      <Form handleCloseModal={closeModal} recovery={true} />
    </Modal>
  )
}

export default RecoveryPassword
