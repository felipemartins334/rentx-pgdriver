import { AppError } from '@shared/errors/AppError'
import { sign, verify } from 'jsonwebtoken'

interface Payload{
  user: string
}

class JWToken{

  static async createToken(
    payload: object,
    secretKey: string, 
    options: object
    ): Promise<string>{
    const token = sign(payload, secretKey, options)
    return token
  }

  static async verifyToken(
    token: string,
    secretKey: string
    ): Promise<Payload>{
      return new Promise((resolve, reject) => {
        let result: Payload
        try{
          result = verify(token, secretKey) as Payload
    
        }catch(error){
          throw new AppError("Invalid token")
        }
        resolve(result)
      })
    
  }

}

export { JWToken }