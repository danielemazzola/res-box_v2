import { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useScrollToRef from '../../hooks/useScrollToRef'
import './NotFound.css'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'

const NotFound = () => {
  const refNotFoundSection = useRef(null)
  const scrollToRef = useScrollToRef()
  const { refHeaderSection } = useContext(ScrollRefContext)

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
        <Link
          className='button yellow'
          to='/'
          onClick={() => scrollToRef(refHeaderSection)}
        >
          Go home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
