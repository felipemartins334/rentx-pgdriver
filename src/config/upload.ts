import { randomBytes } from 'crypto'
import multer from 'multer'
import { resolve } from "path"

export const uploadFile = (path: string) => {
  return {
    storage: multer.diskStorage({
      destination: resolve(__dirname, "..", "..", path),
      
      filename: function (req, file, cb) {
        const bytes = randomBytes(16).toString("hex")
        const fullFilename = `${bytes}-${file.originalname}`
        cb(null, fullFilename)
      }
    })
  }

}