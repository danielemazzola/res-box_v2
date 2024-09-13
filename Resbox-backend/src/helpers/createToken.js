const createToken = () => {
  const random = Math.random().toString(32).substring(2)
  const date = Date.now().toString(32)
  return random + date
}

const createTokenOperation = () => {
  const datePart = Date.now().toString().slice(-4)
  const randomPart = Math.floor(1000 + Math.random() * 9000).toString()
  const uniqueCode = (parseInt(datePart) + parseInt(randomPart))
    .toString()
    .slice(-4)
  return uniqueCode
}

module.exports = { createToken, createTokenOperation }
