import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { Category } from "@modules/cars/models/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { getConnection } from "@shared/infra/database/getConnection";

class PostgresCategoriesRepository implements ICategoriesRepository{

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    
    const connection = await getConnection()
    
    const category = new Category()
    Object.assign(category, {
      name,
      description
    })   
    
    await connection.query<Category>(`
      INSERT INTO categories(id, name, description)
      VALUES($1, $2, $3);
    `, [category.id, category.name, category.description])
  
    return await this.findByName(name)

  }
  
  async findByName(name: string): Promise<Category> {

    const connection = await getConnection()
    
    const { rows } = await connection.query<Category>(`
    SELECT * FROM categories
    WHERE name = $1
    LIMIT 1
    `, [name])

    return rows[0]
  }

}

export { PostgresCategoriesRepository }