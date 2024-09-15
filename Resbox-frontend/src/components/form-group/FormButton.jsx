const FormButton = ({ isActive, onClick, style, children }) => {
  return (
    <button
      type='button'
      className={isActive ? 'active-button' : ''}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  )
}

export default FormButton
