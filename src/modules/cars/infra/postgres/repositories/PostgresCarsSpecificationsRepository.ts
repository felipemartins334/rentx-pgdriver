import { ICreateCarSpecification } from "@modules/cars/dtos/ICreateCarSpecificationDTO";
import { CarSpecification } from "@modules/cars/models/CarSpecification";
import { ICarsSpecificationsRepository } from "@modules/cars/repositories/ICarsSpecificationsRepository";
import { getConnection } from "@shared/infra/database/getConnection";

class PostgresCarsSpecificationsRepository implements ICarsSpecificationsRepository{
  
  async create({
    car_id,
    specification_id
  }: ICreateCarSpecification): Promise<CarSpecification> {
    const connection = await getConnection()
    const carSpecification = new CarSpecification()
    await connection.query<CarSpecification>(`
    INSERT INTO specifications_cars(id, car_id, specification_id)
    VALUES($1, $2, $3)
    `, [carSpecification.id, car_id, specification_id])

    return await this.findBySpecificationIdAndCarId(car_id , specification_id)
  }

  async findBySpecificationIdAndCarId(car_id: string , specification_id: string): Promise<CarSpecification> {
      const connection = await getConnection()
      const { rows } = await connection.query(`
      SELECT * FROM specifications_cars
      WHERE specification_id = $1
      AND car_id = $2
      `, [specification_id, car_id])

      return rows[0]
  }

}

export { PostgresCarsSpecificationsRepository }