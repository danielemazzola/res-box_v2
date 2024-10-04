import './Footer.css'
import logo from '/images/logo.png'

const Footer = () => {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#ececec'
          fillOpacity='1'
          d='M0,160L80,176C160,192,320,224,480,240C640,256,800,256,960,261.3C1120,267,1280,277,1360,282.7L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'
        ></path>
      </svg>

      <footer>
        <div className='footer__content-info'>
          <div>
            <h5>Colabora con Res-Box</h5>
            <p>Res-Box para Partners</p>
            <p>Cómo funsiona</p>
          </div>
          <div>
            <h5>Enlaces de interes</h5>
            <p>Condiciones del servicio Partners</p>
            <p>Politicas de Privacidad</p>
            <p>Contacto</p>
          </div>
          <div>
            <h5>Síguenos</h5>
            <p>Facebook</p>
            <p>Linkedin</p>
            <p>Instagram</p>
          </div>
        </div>
        <div className='footer__content-reserved'>
          <div className='coffee-drop'></div>
          <div className='footer__content-reserved-info'>
            <span>
              All Rights Reserved &#174;​{' '}
              {year === 2024 ? '2024' : `2024-${year}`}
            </span>
            <i className='text-gray-300 font-light'>Powered by</i>
            <img alt='Logo Res-Box' src={logo} width='70' loading='lazy' />
            <i className='text-gray-300 font-semibold'>RES-BOX</i>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
