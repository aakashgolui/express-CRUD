import { NextFunction, Request, Response } from 'express';
import { CustomError } from './error.ts';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const err: CustomError = new Error('Route not found');
  err.status = 404;
  next(err);
};

export default notFoundHandler;
