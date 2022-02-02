import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { ICarsSpecificationsRepository } from "@modules/cars/repositories/ICarsSpecificationsRepository"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CarsSpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsSpecificationsRepositoryInMemory"
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory"
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsSpecificationsRepositoryInMemory: ICarsSpecificationsRepository
let carsRepositoryInMemory: ICarsRepository
let specificationsRepositoryInMemory: ISpecificationsRepository

describe("Create a new specification to a car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    carsSpecificationsRepositoryInMemory = new CarsSpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
      carsSpecificationsRepositoryInMemory
      )
  })

  it("should be able to add a new specification to a car", async () => {
    const specification = await specificationsRepositoryInMemory.create({
      description: "rápido",
      name: "carro esportivo"
    })

    const car = await carsRepositoryInMemory.create({
      brand: "Teste",
      category_id: "123",
      daily_rate: 100,
      description: "Carro teste",
      fine_amount: 50,
      license_plate: "123-BC",
      name: "Carro Testagem"
    })

    const carSpecification = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id: specification.id
    })

    expect(carSpecification.specification_id).toBe(specification.id)
  })

  it("should not be able to add the same specification to a car", async () => {
    expect(async () => {
      
      const specification = await specificationsRepositoryInMemory.create({
        description: "rápido",
        name: "carro esportivo"
      })
  
      const car = await carsRepositoryInMemory.create({
        brand: "Teste",
        category_id: "123",
        daily_rate: 100,
        description: "Carro teste",
        fine_amount: 50,
        license_plate: "123-BC",
        name: "Carro Testagem"
      })
  
      const carSpecification = await createCarSpecificationUseCase.execute({
        car_id: car.id,
        specification_id: specification.id
      })

      const carSpecification1 = await createCarSpecificationUseCase.execute({
        car_id: car.id,
        specification_id: specification.id
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to add a specification to a nonexisting car", async () => {
    expect(async () => {
      
      const specification = await specificationsRepositoryInMemory.create({
        description: "rápido",
        name: "carro esportivo"
      })  

      const carSpecification = await createCarSpecificationUseCase.execute({
        car_id: "123",
        specification_id: specification.id
      })

    }).rejects.toBeInstanceOf(AppError)
   
  })

  it("should not be able to add a nonexisting specification to a car", async () => {
    expect(async () => {
      
      const car = await carsRepositoryInMemory.create({
        brand: "Teste",
        category_id: "123",
        daily_rate: 100,
        description: "Carro teste",
        fine_amount: 50,
        license_plate: "123-BC",
        name: "Carro Testagem"
      })
  

      const carSpecification = await createCarSpecificationUseCase.execute({
        car_id: car.id,
        specification_id: '123'
      })

    }).rejects.toBeInstanceOf(AppError)
   
    
  })
})