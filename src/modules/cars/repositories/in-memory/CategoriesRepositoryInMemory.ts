import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { Category } from "@modules/cars/models/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository{

  private categories: Category[] = []

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category()
    Object.assign(category, {
      name,
      description
    })
    this.categories.push(category)
    return category
  }

  async findByName(name: string): Promise<Category>{
    const category = this.categories.find(category => category.name === name)
    return category
  }

}

export { CategoriesRepositoryInMemory }