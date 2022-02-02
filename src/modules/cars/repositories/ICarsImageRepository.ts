import { IUploadCarImageDTO } from "../dtos/IUploadCarImageDTO";
import { CarImage } from "../models/CarImage";

interface ICarsImageRepository{
  uploadImage(data: IUploadCarImageDTO): Promise<CarImage>
  findByFilename(filename: string): Promise<CarImage>
}

export { ICarsImageRepository }