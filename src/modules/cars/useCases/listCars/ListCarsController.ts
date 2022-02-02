import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarsUseCase } from "./ListCarsUseCase";

class ListCarController{

  async handle(request: Request, response: Response): Promise<Response>{
    const { category, name, brand } = request.query
    const listCarsUseCase = container.resolve(ListCarsUseCase)
    const cars = await listCarsUseCase.execute({ 
      brand: brand as string,
      category: category as string,
      name: name as string
    })

    return response.json(cars)

  }

}

export { ListCarController }