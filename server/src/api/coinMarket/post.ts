import { Request, Response } from 'express';

import { postMyBoughtCoin as myBoughtCoinData } from '../../service/myBoughtCoin';
import { errorCodeMap } from '../../../serverTypes/apiTypes';
import { guardRunTimeError } from '../../../common/guardRunTimeError';
import type { PostMyBoughtCoinData } from '../../../serverTypes/myBoughtCoinTypes';

const isRequestBodyType = (requestBody: unknown): requestBody is PostMyBoughtCoinData =>
  guardRunTimeError(() => {
    const { my_bought_coin, user_id } = requestBody as PostMyBoughtCoinData;
    if (typeof my_bought_coin === 'number' && typeof user_id === 'number') {
      return true;
    }
    return false;
  });

export const postCoinMarket = async (req: Request, res: Response) => {
  if (!isRequestBodyType(req.body)) {
    return res.status(400).json({ success: false, errorCode: errorCodeMap.badRequest });
  }
  const { my_bought_coin: myBoughtCoin, user_id: userId } = req.body;
  try {
    await myBoughtCoinData(myBoughtCoin, userId);
    res.send({ success: true, data: {} });
  } catch (e) {
    res.status(500).json(`Failed to post the data：${e}`);
  }
};
