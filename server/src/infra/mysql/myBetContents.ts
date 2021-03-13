import { getMysqlData } from './mysql';
import { isMyBetContentsDatasType } from '../../../serverTypes/myBetContentsTypes';

export const getMyBetContentsData = async (sql: string, userId: number) => {
  const myBetContentsDatas = await getMysqlData(sql, userId);

  if (!isMyBetContentsDatasType(myBetContentsDatas)) {
    throw new Error('Type is not correct');
  }

  if (myBetContentsDatas.length === 0) return null;

  return myBetContentsDatas;
};
