import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/models/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { getConnection } from "@shared/infra/database/getConnection";

class PostgresSpecificationsRepository implements ISpecificationsRepository{
  
  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    
    const connection = await getConnection()
    const specification = new Specification()

    const { rows } = await connection.query<Specification>(`
    INSERT INTO specifications(id, name, description)
    VALUES($1,$2,$3);
    `, [specification.id, name, description ])
    
    return rows[0]
  }

  async findByName(name: string): Promise<Specification> {
    const connection = await getConnection()
    const { rows } = await connection.query<Specification>(`
    SELECT * FROM specifications
    WHERE name = $1
    LIMIT 1
    `, [name])
    return rows[0]
  }

}

export { PostgresSpecificationsRepository }