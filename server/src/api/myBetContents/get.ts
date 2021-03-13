import { Request, Response } from 'express';

import { getMyBetContents as myBetContentsData } from '../../service/myBetContents';
import { errorCodeMap } from '../../../serverTypes/apiTypes';
import { guardRunTimeError } from '../../../common/guardRunTimeError';

type RequestQuery = {
  user_id: string;
};

const isRequestQueryType = (requestQuery: unknown): requestQuery is RequestQuery =>
  guardRunTimeError(() => {
    const { user_id } = requestQuery as RequestQuery;
    if (typeof user_id === 'string') {
      return true;
    }
    return false;
  });

export const getMyBetContents = async (req: Request, res: Response) => {
  if (!isRequestQueryType(req.query)) {
    return res.status(400).json({ success: false, errorCode: errorCodeMap.badRequest });
  }
  const { user_id: userId } = req.query;
  try {
    const userIdAsNumber = Number(userId);
    const data = await myBetContentsData(userIdAsNumber);
    res.send({ success: true, data });
  } catch (e) {
    res.status(500).json(`Failed to get the data：${e}`);
  }
};
