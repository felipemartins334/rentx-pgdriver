import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepository: ICategoriesRepository

describe("Create a new category", () => {

  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
  })

  it("should be able to create a new category", async () => {
    const category = await createCategoryUseCase.execute({
      name: "Test Category",
      description: "Test category description"
    })

    expect(category).toHaveProperty("id")
  })

  it("should not be able to create a category with existing name", async () => {
   
    expect( async () => {
      
      const category01 = await createCategoryUseCase.execute({
        name: "Test Category",
        description: "Test category description 01"
      })
  
      const category02 = await createCategoryUseCase.execute({
        name: "Test Category",
        description: "Test category description 02"
      })

    }).rejects.toBeInstanceOf(AppError)

  })
})