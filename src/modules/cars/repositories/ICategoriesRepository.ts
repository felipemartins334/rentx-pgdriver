import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../models/Category";

interface ICategoriesRepository{

  create(data: ICreateCategoryDTO): Promise<Category>
  findByName(name: string): Promise<Category>

}

export { ICategoriesRepository }