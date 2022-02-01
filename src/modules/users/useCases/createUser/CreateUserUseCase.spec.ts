import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { AppError } from "@shared/errors/AppError"
import { CreateUserUseCase } from "./CreateUserUseCase"

let createUserUseCase: CreateUserUseCase
let usersRepository: IUsersRepository

describe("Create a new user", () => {
  
  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })
  
  it("should be able to create a new user", async () => {
    
    const user = await createUserUseCase.execute({
      driver_license: "Tester",
      email: "tester@rentx.com",
      name: "Tester",
      password: "123"
    })

    expect(user).toHaveProperty("id")
  })

  it("should not be able to create a user with existing email", async () => {

    expect(async () => {
    
      await createUserUseCase.execute({
        driver_license: "Tester",
        email: "tester@rentx.com",
        name: "Tester",
        password: "123"
      })

      await createUserUseCase.execute({
        driver_license: "Tester",
        email: "tester@rentx.com",
        name: "Tester",
        password: "123"
      })
  
  
    }).rejects.toBeInstanceOf(AppError)

  })

  it("the property admin should be false by default", async () => {

    const user = await createUserUseCase.execute({
      driver_license: "Tester",
      email: "tester@rentx.com",
      name: "Tester",
      password: "123"
    })

    expect(user.admin).toBe(false)
  })
})