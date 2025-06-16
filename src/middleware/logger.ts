import colors from 'colors';
import { NextFunction, Request, Response } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const methodColors = {
    GET: 'green',
    POST: 'blue',
    PUT: 'yellow',
    DELETE: 'red',
    PATCH: 'cyan',
  } as const;

  const method = req.method.toUpperCase();
  const color =
    method in methodColors
      ? methodColors[method as keyof typeof methodColors]
      : 'white';

  console.log(
    colors[color](
      `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`,
    ),
  );

  next();
};

export default logger;
