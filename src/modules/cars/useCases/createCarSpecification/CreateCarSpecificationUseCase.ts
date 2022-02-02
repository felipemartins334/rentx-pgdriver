import { ICreateCarSpecification } from "@modules/cars/dtos/ICreateCarSpecificationDTO";
import { CarSpecification } from "@modules/cars/models/CarSpecification";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICarsSpecificationsRepository } from "@modules/cars/repositories/ICarsSpecificationsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCarSpecificationUseCase{

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository,
    @inject("CarsSpecificationsRepository")
    private carsSpecificationsRepository: ICarsSpecificationsRepository
  ){}

  async execute({
    car_id,
    specification_id
  }: ICreateCarSpecification): Promise<CarSpecification>{

    const carExists = await this.carsRepository.findById(car_id)
    
    if(!carExists){
      throw new AppError("Car don't exist")
    } 

    const specificationExists = await this.specificationsRepository.findById(specification_id)
    
    if(!specificationExists){
      throw new AppError("Specification don't exist")
    }

    const carSpecificationAlreadyExists = await this.carsSpecificationsRepository.findBySpecificationIdAndCarId(car_id, specification_id)
    if(carSpecificationAlreadyExists && carSpecificationAlreadyExists.car_id === car_id){
      throw new AppError("Specification already exists for this car")
    }

    const carSpecification = await this.carsSpecificationsRepository.create({
      car_id: carExists.id,
      specification_id
    })

    return carSpecification
  }

}

export { CreateCarSpecificationUseCase }