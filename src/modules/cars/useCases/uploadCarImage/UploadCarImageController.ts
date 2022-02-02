import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

class UploadCarImageController{
 
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.params
    const { file } = request
    
    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)

    const carImage = await uploadCarImageUseCase.execute({
      car_id: id,
      filename: file.filename
    })

    return response.json(carImage) 
  }
}

export { UploadCarImageController }