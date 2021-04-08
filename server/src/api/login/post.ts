import { Request, Response } from 'express';

import { checkLoginInfo } from '../../service/login';
import { errorCodeMap } from '../../../serverTypes/apiTypes';
import { guardRunTimeError } from '../../../common/guardRunTimeError';
import type { PostLoginData } from '../../../serverTypes/userTypes';

const isRequestBodyType = (requestBody: unknown): requestBody is PostLoginData =>
  guardRunTimeError(() => {
    const { email, password } = requestBody as PostLoginData;
    if (typeof email === 'string' && typeof password === 'string') {
      return true;
    }
    return false;
  });

export const postLoginInfo = async (req: Request, res: Response) => {
  if (!isRequestBodyType(req.body)) {
    return res.status(400).json({ success: false, errorCode: errorCodeMap.badRequest });
  }
  const { email, password } = req.body;
  try {
    const data = await checkLoginInfo(email, password);
    req.session.login = data;
    res.send({ success: true, data });
  } catch (e) {
    console.log(e);
    res.status(500).json(`Failed to post the data：${e}`);
  }
};
