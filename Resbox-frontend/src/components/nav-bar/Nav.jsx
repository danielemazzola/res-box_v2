import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth/authContext'
import menu from '/images/special_menu.png'
import logo from '/images/logo.png'
import linkedin from '/images/linkedin.png'
import github from '/images/github.png'
import './Nav.css'
import { handleCloseSesion } from '../../reducer/auth-reducer/auth.action'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const {
    dispatchLoader,
    dispatchToast,
    dispatchAuth,
    stateIsAuth: { user }
  } = useContext(ReducersContext)

  return (
    <>
      <div className='container-nav-header'>
        <div className='fadeIn'>
          <button
            className={`btn-menu fadeIn z-index-1000 ${
              !showMenu ? 'bg-white-menu' : ''
            }`}
            onClick={() => setShowMenu(!showMenu)}
          >
            <img src={menu} width='30' />
          </button>
        </div>
      </div>
      <div
        className={`contain-nav-bar ${
          !showMenu ? 'show-open-menu' : 'show-close-menu'
        }`}
      >
        <div className='filter'>
          <ul>
            <li className={`img-show ${showMenu ? '' : 'fadeIn'}`}>
              <Link to='./'>
                <button
                  className='z-index-1000 button'
                  onClick={() => setShowMenu(!showMenu)}
                >
                  Inicio
                </button>
              </Link>
            </li>
            <li className={`img-show ${showMenu ? '' : 'fadeIn'}`}>
              <Link to='dashboard'>
                <button
                  className='z-index-1000 button'
                  onClick={() => setShowMenu(!showMenu)}
                >
                  Panel de control
                </button>
              </Link>
            </li>
            <li className={`img-show ${showMenu ? '' : 'fadeIn'}`}>
              <Link to='my-boxes'>
                <button
                  className='z-index-1000 button'
                  onClick={() => setShowMenu(!showMenu)}
                >
                  Mis Boxes
                </button>
              </Link>
            </li>
            <li className={`img-show ${showMenu ? '' : 'fadeIn'}`}>
              <Link to='promo-box'>
                <button
                  className='z-index-1000 button'
                  onClick={() => setShowMenu(!showMenu)}
                >
                  Promo box
                </button>
              </Link>
            </li>
            <li className={`img-show ${showMenu ? '' : 'fadeIn'}`}>
              <button
                className='z-index-1000 button'
                title='Close sesion'
                onClick={() => {
                  handleCloseSesion(
                    dispatchLoader,
                    dispatchToast,
                    dispatchAuth,
                    navigate,
                    user
                  )
                  setShowMenu(false)
                }}
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
          <div className='contain-background-img-nav'>
            <div>
              <img
                src={logo}
                alt='Logo res-box'
                className={`${showMenu ? '' : 'fadeIn'}`}
                onClick={() => setShowMenu(!showMenu)}
              />
              <p>RES-BOX</p>
            </div>
            <div className='container-options-menu'>
              <a
                className='link-social-media'
                href='https://www.linkedin.com/in/daniele-mazzola/'
                target='_blank'
                rel='noopener noreferrer'
                title='Linkedin'
              >
                <img src={linkedin} width='30' />
              </a>
              <a
                className='link-social-media'
                href='https://github.com/danielemazzola'
                target='_blank'
                rel='noopener noreferrer'
                title='Linkedin'
              >
                <img src={github} width='30' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav
