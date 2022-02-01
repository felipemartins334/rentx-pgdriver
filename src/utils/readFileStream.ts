import fs from 'fs'

export const readFileStream = async (path: string): Promise<string> => {
  
  let data=''

  return new Promise( (resolve, reject) => {  

    const stream = fs.createReadStream(path)

    stream.on("data", chunk => {
      data += (chunk.toString().trim())
  })
  
    stream.on("error", (error) => {
      reject(error)
    })

    stream.on("end", () => {
      fs.promises.unlink(path)
      resolve(data)
    })

  })
}