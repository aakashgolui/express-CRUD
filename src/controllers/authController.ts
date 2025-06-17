import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.ts';
import { CustomError } from '../types/index.ts';

const secretKey = process.env.JWT_SECRET_KEY || '';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    const err: CustomError = new Error('Registration failed');
    err.status = 500;
    return next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    const err: CustomError = new Error(
      error instanceof Error ? error.message : 'Internal Server Error',
    );
    err.status = 500;
    next(err);
  }
};
