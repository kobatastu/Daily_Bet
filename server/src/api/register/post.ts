import { Request, Response } from 'express';

import { checkLoginInfo, addUserInfo } from '../../service/user';
import { errorCodeMap } from '../../../serverTypes/apiTypes';
import { guardRunTimeError } from '../../../common/guardRunTimeError';
import type { PostUserData } from '../../../serverTypes/userTypes';

const isRequestBodyType = (requestBody: unknown): requestBody is PostUserData =>
  guardRunTimeError(() => {
    const { email, password, name } = requestBody as PostUserData;
    if (typeof email === 'string' && typeof password === 'string' && typeof name === 'string') {
      return true;
    }
    return false;
  });

export const postRegisterUserInfo = async (req: Request, res: Response) => {
  if (!isRequestBodyType(req.body)) {
    return res.status(400).json({ success: false, errorCode: errorCodeMap.badRequest });
  }
  const { email, password, name } = req.body;
  const isUserExsisted = await checkLoginInfo(email, password);
  if (!!isUserExsisted)
    return res.status(500).json({ success: false, errorCode: errorCodeMap.badRequest });
  const data = await addUserInfo(email, password, name);
  req.session.login = data;
  res.send({ success: true, data });
};
