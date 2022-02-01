import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/models/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository{
  
  users: User[] = []
  
  async create({
    driver_license,
    email,
    name,
    password
  }: ICreateUserDTO): Promise<User> {
    const user = new User()
    Object.assign(user,
      {
        driver_license,
        email,
        name,
        password
      })

    this.users.push(user)
    return user
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id)
  }

  async updateAvatar(user:User, file_name: string): Promise<User>{
    user.avatar = file_name
    return user
  }

}

export { UsersRepositoryInMemory }