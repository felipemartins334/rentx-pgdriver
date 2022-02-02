import { ICreateCarSpecification } from "@modules/cars/dtos/ICreateCarSpecificationDTO";
import { CarSpecification } from "@modules/cars/models/CarSpecification";
import { ICarsSpecificationsRepository } from "../ICarsSpecificationsRepository";

class CarsSpecificationsRepositoryInMemory implements ICarsSpecificationsRepository{
  
  carsSpecifications: CarSpecification[] = []
  
  async create({
    car_id,
    specification_id
  }: ICreateCarSpecification): Promise<CarSpecification> {
    const carSpecification = new CarSpecification()
    Object.assign(carSpecification, {
      car_id,
      specification_id
    })
    this.carsSpecifications.push(carSpecification)
    return carSpecification
  }

  async findBySpecificationIdAndCarId(car_id: string ,specification_id: string): Promise<CarSpecification> {
    return this.carsSpecifications
      .filter(carSpecification => carSpecification.specification_id === specification_id)
      .find(carSpecification => carSpecification.car_id === car_id)
    
  }
  
}

export { CarsSpecificationsRepositoryInMemory }