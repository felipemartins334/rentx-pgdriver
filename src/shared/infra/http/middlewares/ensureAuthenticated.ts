import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { JWToken } from '@utils/jwtoken'

export const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction) => {

  const auth = request.headers.authorization
  if(!auth){
    throw new AppError("Token missing")
  }

  const [, token] = auth.split(" ")

  const result = await JWToken.verifyToken(token, "94a08da1fecbb6e8b46990538c7b50b2")
  request.user={
    id: result.user
  }
  next()
    
}
