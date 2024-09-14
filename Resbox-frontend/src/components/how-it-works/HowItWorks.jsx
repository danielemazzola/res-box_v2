import coffe from '/images/coffe.webp'
import box from '/images/caja.webp'
import tazaCafe from '/images/taza-cafe.webp'
import './HowItWorks.css'
import { useContext } from 'react'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'

const HowItWorks = () => {
  const { refFunctionAppSection } = useContext(ScrollRefContext)
  return (
    <div className='container-how-work' ref={refFunctionAppSection}>
      <div className='contain-log-work'>
        <div className='contain-log-img-work img-show'>
          <img alt='image coffe banner' src={coffe} />
        </div>
        <div className='contain-description-work'>
          <div className='contain-title-app-work'>
            <h2 className='img-show'>Box</h2>
            <p className='img-show'>
              Compra tus packs de forma segura desde nuestra aplicación.
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <div className='contain-log-work'>
        <div className='contain-log-img-work img-show'>
          <img alt='image coffe banner' src={box} />
        </div>
        <div className='contain-description-work'>
          <div className='contain-title-app-work'>
            <h2 className='img-show'>Canjea el codigo</h2>
            <p className='img-show'>
              Canjea la cantidad de productos que desees consumir.
            </p>
          </div>
        </div>
      </div>
      <div className='contain-log-work'>
        <div className='contain-log-img-work img-show'>
          <img alt='image coffe banner' src={tazaCafe} />
        </div>
        <div className='contain-description-work'>
          <div className='contain-title-app-work'>
            <h2 className='img-show'>Disfrutar</h2>
            <p className='img-show'>Disfruta de tu producto❤️</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
