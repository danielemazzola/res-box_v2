const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_HOST,
    pass: process.env.PASSWORD_HOST
  }
})

const sendMail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.EMAIL_HOST,
    to,
    subject,
    html: htmlContent
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error: ${error}`)
    } else {
      console.log(`Email enviado a: ${info.response}`)
    }
  })
}

module.exports = { sendMail }
