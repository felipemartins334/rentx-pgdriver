import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: ICarsRepository

describe("Create a new car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it("should be able to create a new car", async () => {  

    const car = await createCarUseCase.execute({
      brand: "Toyota",
      category_id: "123",
      daily_rate: 100,
      description: "Carro bonito",
      fine_amount: 50,
      license_plate: "123-ABC",
      name: "Palio"

    })

    expect(car).toHaveProperty("id")
  })

  it("should not be able to create a new car with existing license_plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: "Toyota",
        category_id: "123",
        daily_rate: 100,
        description: "Carro bonito",
        fine_amount: 50,
        license_plate: "123-ABC",
        name: "Palio"
  
      })
      await createCarUseCase.execute({
        brand: "Toyota",
        category_id: "123",
        daily_rate: 100,
        description: "Carro bonito",
        fine_amount: 50,
        license_plate: "123-ABC",
        name: "Palio"
  
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      brand: "Toyota",
      category_id: "123",
      daily_rate: 100,
      description: "Carro bonito",
      fine_amount: 50,
      license_plate: "123-ABC",
      name: "Palio"

    })

    expect(car.available).toBe(true)
  })
})