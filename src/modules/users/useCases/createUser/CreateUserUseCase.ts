import { AppError } from "@shared/errors/AppError";
import { Hash } from "@utils/hash";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../models/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase{

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository ){}

  async execute({ 
    driver_license,
    email,
    name,
    password
  }: ICreateUserDTO): Promise<User>{

    const userAlreadyExists = await this.usersRepository.findByEmail(email)
    if(userAlreadyExists){
      throw new AppError("User already exists")
    }
    const passwordHash = await Hash.generateHash(password, '8003ee970ed37e49da6c084aee8c4e11')
    const user = await this.usersRepository.create({
      driver_license,
      email,
      name,
      password: passwordHash
    })

    return user
  }
  
}

export { CreateUserUseCase }