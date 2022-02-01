import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadUserAvatarUseCase } from "./UploadUserAvatarUseCase";

class UploadUserAvatarController{
  
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.user
    const file = request.file
    
    const uploadUserAvatarUseCase = container.resolve(UploadUserAvatarUseCase)
    const user = await uploadUserAvatarUseCase.execute(file.filename, id)

    return response.json(user)
  }
}

export { UploadUserAvatarController }