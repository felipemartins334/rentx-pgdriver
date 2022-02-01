import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { Category } from "@modules/cars/models/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCategoryUseCase{

  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository){}

  async execute({ name, description }: ICreateCategoryDTO): Promise<Category>{
    
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
      )
      
    if(categoryAlreadyExists){
      throw new AppError("Category already exists")
    }

    const category = await this.categoriesRepository.create({name, description})

    return category
  }


}

export { CreateCategoryUseCase }