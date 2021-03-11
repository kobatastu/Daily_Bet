import { Request, Response } from 'express';

import { getBetContents as betContentsData } from '../../service/betContents';

export const getBetContents = async (req: Request, res: Response) => {
  try {
    const data = await betContentsData();
    res.send({ success: true, data });
  } catch (e) {
    res.status(500).json(`Failed to get the data：${e}`);
  }
};
