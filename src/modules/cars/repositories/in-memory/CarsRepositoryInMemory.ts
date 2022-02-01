import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListCarsDTO } from "@modules/cars/dtos/IListCarsDTO";
import { Car } from "@modules/cars/models/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async listAvailableCars({
    category,
    brand,
    name,
  }: IListCarsDTO): Promise<Car[]> {
    return this.cars
    .filter((car) => {
      return car.available === true
    })
    .filter(car => {
      if(category && car.category_id === category){
        return car
      }
      if(brand && car.brand === brand){
        return car
      }
      if(name && car.name === name){
        return car
      }
    })
    

  }
}


export { CarsRepositoryInMemory };
