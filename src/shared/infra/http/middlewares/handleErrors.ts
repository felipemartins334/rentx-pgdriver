import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export const handleErrors = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json(error.message)
  }
  return response.status(500).json({
    status: `Internal Server Error`,
    message: error.message
  })
};
