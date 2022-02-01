import { Pool } from 'pg'

export const getConnection = async () => {
  
  const pool = new Pool({
    user: "user",
    password: "password",
    host: "localhost",
    database: "database",
    port: 5432
  })
  
  pool.connect()
  
  return pool
}