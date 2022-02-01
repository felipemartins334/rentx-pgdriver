import { Specification } from '@modules/cars/models/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateSpecificationDTO } from '../../dtos/ICreateSpecificationDTO'

@injectable()
class CreateSpecificationUseCase {

  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ){}

  async execute({ name, description }: ICreateSpecificationDTO): Promise<Specification> {

    const specificationAlreadyExists = await this.specificationsRepository.findByName(name)

    if(specificationAlreadyExists){
      throw new AppError("Specification already exists")
    }

    const specification = await this.specificationsRepository.create({
      name,
      description
    })

    return specification
  }
}

export { CreateSpecificationUseCase };
