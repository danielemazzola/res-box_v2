import { Link } from 'react-router-dom'
import { arrInfoFooter, year } from './utils'
import './Footer.css'
import logo from '/images/logo.png'

const Footer = () => {
  return (
    <>
      <footer>
        <div className='footer__content-info'>
          {arrInfoFooter?.map((info, index) => (
            <div key={index}>
              <h5>{info.title}</h5>
              {info.links?.map((link, index) => (
                <>
                  {['Facebook', 'LinkedIn', 'Instagram'].includes(link.text) ? (
                    <a
                      href={link.path}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link key={index} to={link.path}>
                      {link.text}
                    </Link>
                  )}
                </>
              ))}
            </div>
          ))}
        </div>
        <div className='footer__content-reserved'>
          <div className='coffee-drop'></div>
          <div className='footer__content-reserved-info'>
            <span>All Rights Reserved &#174;​ {year()}</span>
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
