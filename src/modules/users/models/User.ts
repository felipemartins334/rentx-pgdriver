import { v4 as uuidV4 } from "uuid"

class User{

  id: string
  name: string
  password: string
  email: string
  driver_license: string
  admin: boolean
  avatar: string
  created_at: Date

  constructor(){
    if(!this.id){
      this.id = uuidV4()
      this.admin = false
    }
  }
}

export { User }