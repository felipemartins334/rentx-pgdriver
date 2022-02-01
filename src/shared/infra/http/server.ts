import 'reflect-metadata'
import '../../container/'
import express from "express";
import 'express-async-errors'
import { routes } from "./routes";
import { runMigrations } from '../database/runMigrations'
import { handleErrors } from './middlewares/handleErrors';


runMigrations()

const app = express()

app.use(express.json())

app.use(routes)

app.use(handleErrors)

app.listen(3333, () => {
  console.log("Server is running")
})
