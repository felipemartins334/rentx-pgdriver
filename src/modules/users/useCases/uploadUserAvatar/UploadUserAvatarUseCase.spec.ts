import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { UploadUserAvatarUseCase } from "./UploadUserAvatarUseCase"

let uploadUserAvatarUseCase: UploadUserAvatarUseCase
let usersRepositoryInMemory: IUsersRepository

describe("Upload an avatar", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    uploadUserAvatarUseCase = new UploadUserAvatarUseCase(usersRepositoryInMemory)
  })

  it("should be able to upload an avatar", async () => {

    const newUser = await usersRepositoryInMemory.create({
      driver_license: "a",
      email: "b",
      name: "c",
      password: "d"
    })

    const user = await uploadUserAvatarUseCase.execute("abc", newUser.id)
    expect(user.avatar).toBe("abc")
  })
})