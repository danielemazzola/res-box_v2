import './Modal.css'

const Modal = ({ isModalOpen, handleCloseModal, children }) => {
  const handleScreenToClose = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  return (
    <div
      className={`filter modal-overlay ${isModalOpen ? 'open' : 'closed'}`}
      onClick={(e) => {
        handleScreenToClose(e)
      }}
    >
      <button className='modal-close' onClick={handleCloseModal}>
        ❌
      </button>
      {children}
    </div>
  )
}

export default Modal
