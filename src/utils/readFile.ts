import fs from 'fs'

export const readFile = async (path: string): Promise<string> => {

  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      fs.readFile(path, (error, content) => {
        if(error){
          reject(error)
        }
        resolve(content.toString())
      })
    }, 500)
   

  })
  

}