const nodemailer = require('nodemailer')
const { oauth2Client } = require('../gmail.oauth/oauth.google')

const EMAIL_HOST = process.env.EMAIL_HOST
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENTID
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET
const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN

const createTransporter = async () => {
  try {
    const accessToken = await oauth2Client.getAccessToken()
    console.log(accessToken.token)

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_HOST,
        clientId: OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
        accessToken: accessToken
      }
    })
  } catch (error) {
    console.error(`Error al crear el transporter: ${error}`)
    throw error
  }
}

const sendMail = async (to, subject, htmlContent) => {
  try {
    const transporter = await createTransporter()
    const mailOptions = {
      from: process.env.EMAIL_HOST,
      to,
      subject,
      html: htmlContent
    }

    const { response } = await transporter.sendMail(mailOptions)
    console.log(`Email enviado a: ${response}`)
  } catch (error) {
    console.error(`Error al enviar el correo: ${error}`)
  }
}

module.exports = { sendMail }
