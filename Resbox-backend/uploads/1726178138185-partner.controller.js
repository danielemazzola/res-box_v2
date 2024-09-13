let fs = require('fs')
const xlsx = require('xlsx')
const Partner = require('../../models/partner.model/partner.model')

const newPartnerFile = async (req, res, next) => {
  let duplicateEmail = []
  try {
    const filePath = req.file.path
    const reedFilePath = xlsx.readFile(filePath)
    const name_list_file = reedFilePath.SheetNames
    const dataFile = xlsx.utils.sheet_to_json(
      reedFilePath.Sheets[name_list_file[0]]
    )

    const processFile = async (partner) => {
      const { email } = partner
      try {
        const existPartner = await Partner.findOne({ email })
        if (!existPartner) {
          const newPartner = new Partner({
            name: partner.name,
            cif: partner.cif,
            owner_name: partner.owner_name,
            owner_lastname: partner.owner_lastname,
            phone: partner.phone,
            email: partner.email,
            bank_name: partner.bank_name,
            bank_number: partner.bank_number,
            country: partner.country,
            address: partner.address,
            coordinate_x: partner.coordinate_x,
            coordinate_y: partner.coordinate_y
          })
          await newPartner.save()
        } else {
          duplicateEmail.push(email)
        }
      } catch (error) {
        next(error)
      }
    }
    await Promise.all(dataFile.map(processFile))
    res.status(201).json({
      message: 'Archivo procesado correctamente',
      duplicate: duplicateEmail
    })
  } catch (error) {
    next(error)
  } finally {
    fs.unlink(req.file.path, (error) => {
      if (error) {
        next(error)
      }
    })
  }
}

const newPartner = async (req, res, next) => {
  const email = req.body.email.toLowerCase()
  try {
    const exist = await Partner.findOne({ email })
    if (exist) {
      return res.status(409).json({ message: 'El email ya existe.' })
    } else {
      const partner = new Partner({
        ...req.body,
        email
      })
      await partner.save()
      return res
        .status(201)
        .json({ message: 'Partner registrado correctamente', partner })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  newPartnerFile,
  newPartner
}
