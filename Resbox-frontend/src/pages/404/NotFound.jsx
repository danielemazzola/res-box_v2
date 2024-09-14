import { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useScrollToRef from '../../hooks/useScrollToRef'
import './NotFound.css'

const NotFound = () => {
  const refNotFoundSection = useRef(null)
  const scrollToRef = useScrollToRef()

  useEffect(() => {
    if (refNotFoundSection.current) {
      scrollToRef(refNotFoundSection)
    }
  }, [scrollToRef, refNotFoundSection])

  return (
    <div className='not-found' ref={refNotFoundSection}>
      <p>ERROR: 404</p>
      <p>Página no encontrada ;{'('}</p>
      <div className='turn'>
        <Link to='/'>Go home</Link>
      </div>
    </div>
  )
}

export default NotFound
