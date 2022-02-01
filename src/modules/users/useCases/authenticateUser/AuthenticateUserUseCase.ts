import { IAuthenticateUserDTO } from "@modules/users/dtos/IAuthenticateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { Hash } from "@utils/hash";
import { JWToken } from "@utils/jwtoken";
import { inject, injectable } from "tsyringe";

interface IResponse{
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase{

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({ email, password }: IAuthenticateUserDTO ): Promise<IResponse>{
    
    const userExists = await this.usersRepository.findByEmail(email)
    
    if(!userExists){
      throw new AppError("Email or password incorrect")
    }

    const passwordMatches = await Hash.compareHash(
      password, 
      userExists.password, 
      "8003ee970ed37e49da6c084aee8c4e11"
      )
      
    if(!passwordMatches){
      throw new AppError("Email or password incorrect")
    }

    const token = await JWToken.createToken({
      user: userExists.id,
      name: userExists.name,
      email: userExists.email 
    },
    "94a08da1fecbb6e8b46990538c7b50b2",
    {
      expiresIn: "1d"
    }
    )

    return {
      user: {
        name: userExists.name,
        email: userExists.email
      },
      token
    }
  }

}

export { AuthenticateUserUseCase }