import { IListCarsDTO } from "@modules/cars/dtos/IListCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCarsUseCase{

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository){}

  async execute({ name, brand, category }: IListCarsDTO){
    const allAvailableCars = await this.carsRepository.listAvailableCars({ 
      name, 
      brand, 
      category 
    })

    return allAvailableCars
  }
}

export { ListCarsUseCase }