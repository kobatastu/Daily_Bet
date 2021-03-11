import { getMysqlData } from './mysql';
import { isBetContentsDatasType } from '../../../serverTypes/betContentsTypes';

export const getBetContentsData = async (sql: string) => {
  const betContentsDatas = await getMysqlData(sql);

  if (!isBetContentsDatasType(betContentsDatas)) {
    throw new Error('Type is not correct');
  }

  if (betContentsDatas.length === 0) return null;

  return betContentsDatas;
};
