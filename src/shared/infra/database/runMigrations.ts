import { join } from "path"
import fs from 'fs'
import { readFile } from "src/utils/readFile"
import { getConnection } from "./getConnection"

export const runMigrations = async () => {

  const connection = await getConnection()

  const path = join(__dirname, "migrations")

  fs.readdir(path, (error, files) => {

    files.forEach( async file => {
      const data = await readFile(`${path}/${file}`)
      connection.query(data)
    })

  } )

}