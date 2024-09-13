const cloudinary = require('cloudinary').v2

const deleteImg = (imgUrl) => {
  const imgSplit = imgUrl.split('/')
  const nameSplit = imgSplit.at(-1).split('.')[0]
  const folderSplited = imgSplit.at(-2)
  const public_id = `${folderSplited}/${nameSplit}`
  console.log('Attempting to delete image with public_id:', public_id)
  cloudinary.uploader.destroy(public_id, (error, result) => {
    if (error) {
      console.error('Error deleting image:', error)
    } else {
      console.log('Image deleted successfully:', result)
    }
  })
}
module.exports = { deleteImg }
