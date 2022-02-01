import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { AppError } from "@shared/errors/AppError"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase
let usersRepository: IUsersRepository

describe("Authenticate an user", () => {

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })

  it("should be able to authenticate an user", async () => {

    await createUserUseCase.execute({
      driver_license:"CNH",
      email: "tester@rentx.com",
      name: "Tester",
      password: "123"
    })

    const token = await authenticateUserUseCase.execute({
      email: "tester@rentx.com",
      password: "123"
    })
    
    expect(token).toHaveProperty("token")
  })

  it("should not be able authenticate an user with nonexisting email", async () => {
    
    expect(async () => {
      
      await authenticateUserUseCase.execute({
        email: "tester@rentx.com",
        password: "123"
      })

    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to authenticate an user with incorrect password", async () => {

    expect(async () => {
      
      await createUserUseCase.execute({
        driver_license:"CNH",
        email: "tester@rentx.com",
        name: "Tester",
        password: "123"
      })
  
      await authenticateUserUseCase.execute({
        email: "tester@rentx.com",
        password: "1234"
      })

    }).rejects.toBeInstanceOf(AppError)
  })
})