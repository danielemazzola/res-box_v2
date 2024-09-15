import './Alert.css'
const Alert = ({ children }) => {
  return (
    <div id='containerAlertText'>
      <p>{children}</p>
    </div>
  )
}

export default Alert
