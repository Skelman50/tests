import sharp from 'sharp';

const inputImage = process.argv[2]
const outImage = process.argv[5]
const imageWidth = process.argv[3]
const imageHeight = process.argv[4]

function validation (inputImage:string, outImage:string, imageWidth:string, imageHeight:string) {
  
    if (!inputImage || !outImage || !imageWidth || !imageHeight) {
      throw new Error('invalid arguments')
    }
    if (isNaN(+imageHeight) || isNaN(+imageWidth)) {
      throw new Error('Height and width must be a NUMBER')
    }
    if (inputImage.indexOf(".png") === -1 && inputImage.indexOf(".jpg") === -1) {
      throw new Error('Unable to read input image should be .jpg or .png')
    }
    if (outImage.indexOf(".png") === -1 && outImage.indexOf(".jpg") === -1) {
      throw new Error('Unable to read output image should be .jpg or .png')
    }

}
const resizeImage = (inputImage:string, outImage:string, imageWidth:string, imageHeight:string) => {
  try{
  validation(inputImage, outImage, imageWidth, imageHeight)
    sharp(inputImage)
    .resize(+imageWidth, +imageHeight)
    .toFile(outImage, (err) => {
      if (err) {
        throw new Error (err.message)
      }
      console.log(`You created the new image!`)
    })
  }catch(err) {
    console.log(`
    ERROR 
    ${err.message}`)
  }
}

resizeImage(inputImage, outImage, imageWidth, imageHeight)

