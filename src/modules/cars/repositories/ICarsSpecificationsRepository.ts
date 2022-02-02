import { ICreateCarSpecification } from "../dtos/ICreateCarSpecificationDTO";
import { CarSpecification } from "../models/CarSpecification";

interface ICarsSpecificationsRepository{
  create(data: ICreateCarSpecification): Promise<CarSpecification>
  findBySpecificationIdAndCarId(car_id: string, specification_id: string): Promise<CarSpecification>
}

export { ICarsSpecificationsRepository }