import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../types/index.ts';

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status;

  if (status) {
    res.status(status).json({ msg: err.message });
  } else {
    res.status(500).json({ msg: err.message });
  }
};

export default errorHandler;
