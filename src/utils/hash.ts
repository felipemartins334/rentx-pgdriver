import crypto from 'crypto'

class Hash{

  static async generateHash(string: string, key: string): Promise<string>{
    return new Promise((resolve, reject) => {
      
      const hash = crypto.createHmac("sha256", key)
    
      hash.on('readable', () => {

        const data = hash.read()
        
        if(data){
          resolve(data.toString("hex"))
        }
      })
  
      hash.write(string)
      hash.end()
    })
    
  }
  static async compareHash(originalPassword: string, passwordCompared: string, key: string): Promise<boolean>{
    const originalPasswordHash = await this.generateHash(originalPassword, key)
    if(passwordCompared === originalPasswordHash){
      return true
    }
    return false
  }
}

export { Hash }