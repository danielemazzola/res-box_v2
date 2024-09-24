export const arrayNavOptions = [
  {
    route: './',
    title: 'Inicio'
  },
  {
    route: 'dashboard',
    title: 'Panel de Control'
  },
  {
    route: 'my-boxes',
    title: 'Mis Boxes'
  },
  {
    route: 'promo-box',
    title: 'Promo - Box'
  },
  {
    route: 'partner',
    title: 'Quiero ser Partner'
  }
]
export const navOptions = (user) => {
  const arrayNavOptions = [
    {
      route: './',
      title: 'Inicio'
    },
    {
      route: 'dashboard',
      title: 'Panel de Control'
    },
    {
      route: 'my-boxes',
      title: 'Mis Boxes'
    },
    {
      route: 'promo-box',
      title: 'Promo - Box'
    },
    user.roles.includes('partner') && {
      route: 'partner',
      title: 'Quiero ser Partner'
    }
  ]

  return (
    <>
      {arrayNavOptions?.map((val, index) => (
        <li key={index} className={`img-show ${showMenu ? '' : 'fadeIn'}`}>
          <Link to={val.route}>
            <button
              className='z-index-1000 button'
              onClick={() => setShowMenu(!showMenu)}
            >
              {val.title}
            </button>
          </Link>
        </li>
      ))}
    </>
  )
}
