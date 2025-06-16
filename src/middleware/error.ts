import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
  status?: number;
}

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
