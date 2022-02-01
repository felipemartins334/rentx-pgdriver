import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/models/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getConnection } from "@shared/infra/database/getConnection";

class PostgresCarsRepository implements ICarsRepository{
  
  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name
  }: ICreateCarDTO): Promise<Car> {
    let connection = await getConnection()
    const car = new Car()
    await connection.query(`
    INSERT INTO cars(id, brand, category_id, daily_rate, description, fine_amount, license_plate, name)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8)
    `, [car.id, brand, category_id, daily_rate, description, fine_amount, license_plate, name])
    const created = await this.findByLicensePlate(license_plate)
    return created
  }
  
  async findByLicensePlate(license_plate: string): Promise<Car> {
    let connection = await getConnection()
    const { rows } = await connection.query<Car>(`
    SELECT * FROM cars
    WHERE license_plate = $1
    LIMIT 1
    `,
    [license_plate]) 
    return rows[0]
  }

}

export { PostgresCarsRepository }