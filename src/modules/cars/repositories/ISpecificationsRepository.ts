import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../models/Specification";

interface ISpecificationsRepository{
  create(data: ICreateSpecificationDTO): Promise<Specification>
  findByName(name: string): Promise<Specification>
}

export { ISpecificationsRepository }