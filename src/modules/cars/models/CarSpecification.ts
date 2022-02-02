import { v4 as uuidV4 } from "uuid"

class CarSpecification{
  id: string
  car_id: string
  specification_id: string
  created_at: Date

  constructor(){
    if(!this.id){
      this.id = uuidV4()
    }
  }
}

export { CarSpecification }