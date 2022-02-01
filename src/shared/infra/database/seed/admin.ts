import { getConnection } from "../getConnection";
import { v4 as uuidV4 } from 'uuid'
import { Hash } from "@utils/hash";

async function create(): Promise<void>{
  const connection =  await getConnection()
  const id = uuidV4()
  const password = await Hash.generateHash("admin", "8003ee970ed37e49da6c084aee8c4e11")
  connection.query(`
  INSERT INTO users(id, name, email, password, admin, driver_license)
  VALUES ($1, 'admin', 'admin@rentx.com', $2, true, 'XXX-ZZZ')
  `, [id, password])
}

create().then(() => {
  console.log("User admin successfully created")
})