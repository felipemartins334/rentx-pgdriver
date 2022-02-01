import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let createSpecificationUseCase: CreateSpecificationUseCase
let specificationsRepository: ISpecificationsRepository

describe("Create a new specification", () => {

  beforeEach(() => {
    specificationsRepository = new SpecificationsRepositoryInMemory()
    createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository)
  })

  it("should be able to create a new specification", async () => {
    const specification = await createSpecificationUseCase.execute({
      name: "Test Specification",
      description: "Test description"
    })

    expect(specification).toHaveProperty("id")
  });

  it("should not be able to create a specification with existing name", async () => {
    expect( async () => {
      
      await createSpecificationUseCase.execute({
        name: "Test Specification",
        description: "Test description"
      })

      await createSpecificationUseCase.execute({
        name: "Test Specification",
        description: "Test description"
      })

    }).rejects.toBeInstanceOf(AppError)
  });
});
