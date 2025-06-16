import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  userId?: string;
}

const secretKey = process.env.JWT_SECRET_KEY || '';

export function verifyToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): void {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    // Narrow the type
    if (typeof decoded === 'object' && 'userId' in decoded) {
      req.userId = (decoded as JwtPayload).userId as string;
      next();
    } else {
      res.status(401).json({ error: 'Invalid token payload' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
