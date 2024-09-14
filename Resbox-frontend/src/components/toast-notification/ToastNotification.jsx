import { useContext, useEffect, useState } from 'react'
import './ToastNotification.css'
import { ReducersContext } from '../../context/reducers/ReducersContext'

const ToastNotification = () => {
  const {
    stateToasts: { notifications },
    dispatchToast
  } = useContext(ReducersContext)

  useEffect(() => {
    notifications.forEach((notification, index) => {
      setTimeout(() => {
        dispatchToast({ type: 'REMOVE_NOTIFICATION', payload: index })
      }, 4000)
    })
  }, [notifications, dispatchToast])

  return (
    <div id='containerAlert'>
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          message={notification.msg}
          isError={notification.error}
        />
      ))}
    </div>
  )
}

const Notification = ({ message, isError }) => {
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const closeTimeout = setTimeout(() => {
      setClosing(true)
    }, 3500)
    return () => clearTimeout(closeTimeout)
  }, [])

  return (
    <div
      className={`alert ${isError ? 'error' : ''} ${closing ? 'close' : ''}`}
    >
      <p className='messageAlert'>{message}</p>
    </div>
  )
}

export default ToastNotification
