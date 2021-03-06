import { v4 as uuidV4 } from "uuid"
import { Category } from "./Category"
import { Specification } from "./Specification"

class Car{
  id: string
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  available: boolean
  brand: string
  category: Category
  specifications: Specification[]
  category_id: string
  created_at: Date

  constructor(){
    if(!this.id){
      this.id = uuidV4()
      this.available = true
      this.created_at = new Date()
    }
  }
}

export { Car }