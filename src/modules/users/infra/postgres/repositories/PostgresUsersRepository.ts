import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/models/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { getConnection } from "@shared/infra/database/getConnection";

class PostgresUsersRepository implements IUsersRepository{
  
  async create({
    driver_license,
    email,
    name,
    password

  }: ICreateUserDTO): Promise<User> {
    
    let connection = await getConnection()
    const user = new User()
    
    await connection.query(`
      INSERT INTO users(id,name,email,password,driver_license)
      VALUES ($1,$2,$3,$4,$5)
    `, [ user.id, name, email, password, driver_license])

    return await this.findByEmail(email)

  }
  async findByEmail(email: string): Promise<User> {
    let connection = await getConnection()
    const { rows } = await connection.query<User>(`
      SELECT * FROM users
      WHERE email = $1
      LIMIT 1
    `, [email])
    return rows[0]

  }

  async findById(id: string): Promise<User>{
    let connection = await getConnection()
    const { rows } = await connection.query<User>(`
    SELECT * FROM users
    WHERE id = $1
    LIMIT 1
    `, [id])
    return rows[0]
  }

  async updateAvatar(user: User, file_name: string): Promise<User> {
    let connection = await getConnection()
    await connection.query<User>(`
      UPDATE users
      SET avatar = $1
      WHERE id = $2
    `, [file_name, user.id])

    return await this.findById(user.id)
  }
  
}

export { PostgresUsersRepository }