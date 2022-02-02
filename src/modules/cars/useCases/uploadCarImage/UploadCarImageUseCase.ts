import { IUploadCarImageDTO } from "@modules/cars/dtos/IUploadCarImageDTO";
import { CarImage } from "@modules/cars/models/CarImage";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class UploadCarImageUseCase{

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("CarsImageRepository")
    private carsImageRepository: ICarsImageRepository
    ){}

  async execute({ car_id, filename }: IUploadCarImageDTO ): Promise<CarImage>{

    const carExists = await this.carsRepository.findById(car_id)

    if(!carExists){
      throw new AppError("Car don't exist")
    }
    
    const carImage = await this.carsImageRepository.uploadImage({
      car_id,
      filename
    })

    return carImage
  }
}

export { UploadCarImageUseCase }