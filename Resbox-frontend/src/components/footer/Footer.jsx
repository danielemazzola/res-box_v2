import './Footer.css'
import logo from '/images/logo.png'

const Footer = () => {
  const date = new Date()
  const year = date.getFullYear()
  return (
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
        <div class='coffee-drop'></div>
        <div className='footer__content-reserved-info'>
          <span>
            All Rights Reserved &#174;​{' '}
            {year === 2024 ? '2024' : `2024-${year}`}
          </span>
          <i className='text-gray-300 font-light'>Powered by</i>
          <img alt='Logo Res-Box' src={logo} width='70' />
          <i className='text-gray-300 font-semibold'>RES-BOX</i>
        </div>
      </div>
    </footer>
  )
}

export default Footer
