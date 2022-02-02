import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListCarsDTO } from "@modules/cars/dtos/IListCarsDTO";
import { Car } from "@modules/cars/models/Car";
import { Category } from "@modules/cars/models/Category";
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
    let created = await this.findByLicensePlate(license_plate)
    created.category = await this.getCategories(created.id)
    delete created.category_id
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

  async findById(car_id: string): Promise<Car>{
    let connection = await getConnection()
    const { rows } = await connection.query<Car>(`
    SELECT * FROM cars
    WHERE id = $1
    LIMIT 1
    `, [car_id])
    return rows[0]

  }

  async getCategories(car_id: string): Promise<Category>{
    let connection = await getConnection()
    const { rows } = await connection.query<Category>(`
      SELECT categories.id, categories.name, categories.description, categories.created_at FROM categories
      INNER JOIN cars
        ON categories.id = cars.category_id
      WHERE cars.id = $1
`, [car_id]
    )
    return rows[0]
  }

  async listAvailableCars({
    brand,
    category,
    name
  }: IListCarsDTO): Promise<Car[]> {
    let connection = await getConnection()

    const { rows } = await connection.query<Car>(`
    SELECT * FROM cars
    WHERE available = true
    `)

    let results: Car[] = []

    for (const row of rows){
      row.category = await this.getCategories(row.id)
      let category_id = row.category_id
      delete row.category_id

      if(category && category_id === category){
        results.push(row)
      }

      if(name && row.name === name){
        results.push(row)
      }

      if(brand && row.brand === brand){
        results.push(row)
      }

      if(!name && !brand && !category){
        results.push(row)

      }
    }
    return results
  }
  

}

export { PostgresCarsRepository }