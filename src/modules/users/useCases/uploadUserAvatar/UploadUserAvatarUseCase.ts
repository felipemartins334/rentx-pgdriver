import { User } from "@modules/users/models/User"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { deleteFile } from "@utils/deleteFile"
import { inject, injectable } from "tsyringe"

@injectable()
class UploadUserAvatarUseCase{

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository){}

  async execute(filename: string, id: string): Promise<User>{
    const user = await this.usersRepository.findById(id)
    if(user.avatar){
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }
    const updated = await this.usersRepository.updateAvatar(user, filename)

    return updated
  }
}

export { UploadUserAvatarUseCase }