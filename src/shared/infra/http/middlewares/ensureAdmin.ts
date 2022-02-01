import { PostgresUsersRepository } from "@modules/users/infra/postgres/repositories/PostgresUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export const ensureAdmin = async (
  request: Request,
  response: Response, 
  next: NextFunction
  ) => {
    const { id } = request.user
    const postgresUsersRepository = new PostgresUsersRepository()
    const user = await postgresUsersRepository.findById(id)
    if(user.admin){
      return next()
    }
    throw new AppError("User must be admin")
  }