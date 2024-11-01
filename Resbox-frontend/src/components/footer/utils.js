export const arrInfoFooter = [
  {
    title: 'Colabora con Res-Box',
    links: [
      { path: 'partners-info', text: 'Res-Box para Partners' },
      { path: 'how-it-works', text: 'Cómo funciona' }
    ]
  },
  {
    title: 'Información de servicio',
    links: [
      {
        path: 'condition-partners',
        text: 'Condiciones del servicio para Partners'
      },
      { path: 'privacy-policies', text: 'Políticas de Privacidad' },
      { path: 'contact', text: 'Contacto' }
    ]
  },
  {
    title: 'Síguenos',
    links: [
      {
        path: 'https://www.linkedin.com/in/daniele-mazzola/',
        text: 'Facebook'
      },
      {
        path: 'https://www.linkedin.com/in/daniele-mazzola/',
        text: 'LinkedIn'
      },
      {
        path: 'https://www.linkedin.com/in/daniele-mazzola/',
        text: 'Instagram'
      }
    ]
  }
]

export const year = () => {
  const date = new Date()
  const year = date.getFullYear()
  return year
}
