import { IUploadCarImageDTO } from "@modules/cars/dtos/IUploadCarImageDTO";
import { CarImage } from "@modules/cars/models/CarImage";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { getConnection } from "@shared/infra/database/getConnection";

class PostgresCarsImageRepository implements ICarsImageRepository{
  
  async uploadImage({
    car_id,
    filename
  }: IUploadCarImageDTO): Promise<CarImage> {

    let connection = await getConnection()

    const image = new CarImage()

    await connection.query(`
    INSERT INTO cars_image(id, car_id, image_name)
    VALUES($1, $2, $3)
    `, 
    [image.id, car_id, filename])

    return await this.findByFilename(filename)
  }

  async findByFilename(filename: string): Promise<CarImage> {
    let connection = await getConnection()

    const { rows } = await connection.query<CarImage>(`
     SELECT * FROM cars_image
     WHERE image_name = $1
     LIMIT 1
     `, 
     [filename])

     return rows[0]

  }

}

export { PostgresCarsImageRepository }