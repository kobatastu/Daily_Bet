import type { NextFunction, Request, Response } from 'express';

import { errorCodeMap } from '../../serverTypes/apiTypes';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const loginSession = req.session.login;
  if (!loginSession) {
    res.status(401).json({ success: false, errorCode: errorCodeMap.unauthorized });
    return;
  }
  next();
};
