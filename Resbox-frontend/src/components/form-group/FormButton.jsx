const FormButton = ({ isActive, onClick, children }) => {
  return (
    <button
      type='button'
      className={isActive ? 'active-button' : ''}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default FormButton
