import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IListCarsDTO } from "../dtos/IListCarsDTO";
import { Car } from "../models/Car";

interface ICarsRepository{
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car>
  findById(car_id: string): Promise<Car>
  listAvailableCars(data: IListCarsDTO): Promise<Car[]>
}

export { ICarsRepository }