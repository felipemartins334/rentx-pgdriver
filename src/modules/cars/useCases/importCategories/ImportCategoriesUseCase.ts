import { Category } from "@modules/cars/models/Category"
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository"
import { intervalFunction } from "@utils/intervalFunction"
import { parser } from "@utils/parser"
import { readFileStream } from "@utils/readFileStream"
import { inject, injectable } from "tsyringe"

@injectable()
class ImportCategoriesUseCase {

  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) { }

  async execute(file: Express.Multer.File): Promise<Category[]> {

    const data = await readFileStream(file.path)

    const categories = await parser(data, "-")
    const responseCategories: Category[] = []

    let i = 0
    return new Promise((resolve, reject) => {
      
      intervalFunction(async () => {
        if(i<categories.length){
          
          const category = categories[i]
          if(!await this.categoriesRepository.findByName(category.position1)){
            const name = category.position1
            const description  = category.position2
            const created = await this.categoriesRepository.create({
              name,
              description
            })
            responseCategories.push(created)
          }
          i = i + 1
        }
      },
      () => {
        if(i === categories.length){
          resolve(responseCategories)
          return true
        }
      })
    })
  }
}

export { ImportCategoriesUseCase }