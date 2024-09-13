const jwt = require('jsonwebtoken')

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '3h' })
}
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY)
}
module.exports = { generateJWT, verifyToken }
