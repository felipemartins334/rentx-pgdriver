import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { CarsImageRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsImageRepositoryInMemory"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { UploadCarImageUseCase } from "./UploadCarImageUseCase"

let uploadCarImageUseCase: UploadCarImageUseCase
let carsRepositoryInMemory: ICarsRepository
let carsImageRepositoryInMemory: ICarsImageRepository

describe("Upload a car image", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory() 
    carsImageRepositoryInMemory = new CarsImageRepositoryInMemory()
    uploadCarImageUseCase = new UploadCarImageUseCase(
      carsRepositoryInMemory,
      carsImageRepositoryInMemory
      )
  })

  it("should be able to upload a car image", async () => {
  
    const car = await carsRepositoryInMemory.create({
      brand: "A",
      category_id: "B",
      daily_rate: 100,
      description: "a",
      fine_amount: 10,
      license_plate: "123",
      name: "ABC"
    })

    const carImage = await uploadCarImageUseCase.execute({
      car_id: car.id , 
      filename: "image.jpeg" 
    })

    expect(carImage.filename).toBe("image.jpeg")
  })

  it("should not be able to upload a image to a nonexisting car", async () => {
    expect(async () => {
      const carImage = await uploadCarImageUseCase.execute({
        car_id: "123" , 
        filename: "image.jpeg" 
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})