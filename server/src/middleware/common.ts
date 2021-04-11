import type { Request, Response, NextFunction } from 'express';

export const handleError = (status = 200, body: unknown) => {
  return (err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }
    return res.status(status).json(body);
  };
};
