import { IListCarsDTO } from "@modules/cars/dtos/IListCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class ListCarsUseCase{

  constructor(private carsRepository: ICarsRepository){}

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