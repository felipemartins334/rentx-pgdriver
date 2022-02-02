import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/models/Specification";
import { ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository{
  
  specifications: Specification[] = []

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()
    Object.assign(specification, {
      name,
      description
    })
    this.specifications.push(specification)
    return specification
  }
  
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(specification => specification.name === name)
    
  }

  async findById(id: string): Promise<Specification>{
    return this.specifications.find(specification => specification.id === id)

  }

}

export { SpecificationsRepositoryInMemory }