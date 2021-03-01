import { Request, Response } from 'express';

import { postBoard as boardData } from '../../service/board';
import { errorCodeMap } from '../../../serverTypes/apiTypes';
import { guardRunTimeError } from '../../../common/guardRunTimeError';

type RequestBody = {
  user_id: string;
  board_content: string;
};

const isRequestBodyType = (requestBody: unknown): requestBody is RequestBody =>
  guardRunTimeError(() => {
    const { user_id, board_content } = requestBody as RequestBody;
    if (typeof user_id === 'string' && typeof board_content === 'string') {
      return true;
    }
    return false;
  });

export const postBoard = async (req: Request, res: Response) => {
  if (!isRequestBodyType(req.body)) {
    return res.status(400).json({ success: false, errorCode: errorCodeMap.badRequest });
  }
  try {
    await boardData(req.body);
    res.send({ success: true, data: {} });
  } catch (e) {
    res.status(500).json(`Failed to post the data：${e}`);
  }
};
