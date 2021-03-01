import { Request, Response } from 'express';

import { getBoard as boardData } from '../../service/board';

export const getBoard = async (req: Request, res: Response) => {
  try {
    const data = await boardData();
    res.send({ success: true, data });
  } catch (e) {
    res.status(500).json(`Failed to get the data：${e}`);
  }
};
