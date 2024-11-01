const Invoice = require('../models/box.model/invoice.model')
const Operation = require('../models/operation.model/operation.model')

const generateInvoiceNumber = async (model, corporateName) => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  const todayString = `${year}` //+${month}${day}

  try {
    const lastInvoiceToday = await model
      .findOne({
        invoice_number: { $regex: `${corporateName}${todayString}` }
      })
      .sort({ createdAt: -1 })
    const lastInvoiceNumber = lastInvoiceToday
      ? lastInvoiceToday.invoice_number.split('/')[1]
      : '0000'
    const newInvoiceNumber = String(Number(lastInvoiceNumber) + 1).padStart(
      4,
      '0'
    )
    const invoiceNumber = `${corporateName}${todayString}/${newInvoiceNumber}`
    return invoiceNumber
  } catch (error) {
    console.log(`Error generando número de factura: ${error.message}`)
    throw new Error('Error generating invoice number')
  }
}

const newInvoiceBox = async (corporateName) => {
  return await generateInvoiceNumber(Invoice, corporateName)
}

const newInvoiceRedeem = async (corporateName) => {
  return await generateInvoiceNumber(Operation, corporateName)
}

module.exports = {
  newInvoiceRedeem,
  newInvoiceBox
}
