import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: ICarsRepository

describe("List cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
  })

  // it("should be able to list all available cars", async () => {
    
  //   await carsRepositoryInMemory.create({
  //       brand: "Toyota",
  //       category_id: "123",
  //       daily_rate: 100,
  //       description: "Carro bonito",
  //       fine_amount: 50,
  //       license_plate: "123-ABC",
  //       name: "Palio"

  //   })

  //   const cars = await listCarsUseCase.execute({})
  //   expect(cars).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({
  //         available: true
  //       })
  //     ])
  //   )

  // })

  it("should be able to list all cars by name", async () => {
    await carsRepositoryInMemory.create({
      brand: "Chevrolet",
      category_id: "123",
      daily_rate: 100,
      description: "Carro bonito",
      fine_amount: 50,
      license_plate: "123-ABC",
      name: "Palio"

    })

    await carsRepositoryInMemory.create({
      brand: "Toyota",
      category_id: "123",
      daily_rate: 100,
      description: "Carro charmoso",
      fine_amount: 50,
      license_plate: "321-CBA",
      name: "Midnight"

    })

    const cars = await listCarsUseCase.execute({name: "Midnight"})
    expect(cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          available: true,
          name: "Midnight"
        })
      ])
    )
  })

  it("should be able to list all cars by brand", async () => {
    carsRepositoryInMemory.create({
      brand: "Chevrolet",
      category_id: "123",
      daily_rate: 100,
      description: "Carro bonito",
      fine_amount: 50,
      license_plate: "123-ABC",
      name: "Palio"

    })

    carsRepositoryInMemory.create({
      brand: "Toyota",
      category_id: "123",
      daily_rate: 100,
      description: "Carro charmoso",
      fine_amount: 50,
      license_plate: "321-CBA",
      name: "Midnight"

    })

    const cars = await listCarsUseCase.execute({brand: "Chevrolet"})
    expect(cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          available: true,
          brand: "Chevrolet"
        })
      ])
    )
  })

  it("should be able to list all cars by category", async () => {
    carsRepositoryInMemory.create({
      brand: "Chevrolet",
      category_id: "123A",
      daily_rate: 100,
      description: "Carro bonito",
      fine_amount: 50,
      license_plate: "123-ABC",
      name: "Palio"

    })

    carsRepositoryInMemory.create({
      brand: "Toyota",
      category_id: "123",
      daily_rate: 100,
      description: "Carro charmoso",
      fine_amount: 50,
      license_plate: "321-CBA",
      name: "Midnight"

    })

    const cars = await listCarsUseCase.execute({category: "123"})
    expect(cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          available: true,
          category_id: "123"
        })
      ])
    )
  })

})