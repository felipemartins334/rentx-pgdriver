import { IUploadCarImageDTO } from "@modules/cars/dtos/IUploadCarImageDTO";
import { CarImage } from "@modules/cars/models/CarImage";
import { ICarsImageRepository } from "../ICarsImageRepository";

class CarsImageRepositoryInMemory implements ICarsImageRepository {
  carsImages: CarImage[] = [];

  async uploadImage({
    car_id,
    filename,
  }: IUploadCarImageDTO): Promise<CarImage> {

    const carImage = new CarImage();

    Object.assign(carImage, {
      car_id, 
      filename
    });

    this.carsImages.push(carImage);
    return carImage;
  }

  async findByFilename(filename: string): Promise<CarImage> {
      return this.carsImages.find(carImage => carImage.filename === filename)
  }
}

export { CarsImageRepositoryInMemory }