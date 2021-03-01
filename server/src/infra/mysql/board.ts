import { getMysqlData, postMysqlData } from './mysql';
import { isBoardDatasType } from '../../../serverTypes/boardTypes';

export const getBoardData = async (sql: string) => {
  const data = await getMysqlData(sql);
  console.log(data);

  if (!isBoardDatasType(data)) {
    throw new Error('Type is not correct');
  }

  if (data.length === 0) return null;

  return data;
};

export const postBoardData = async (sql: string, data) => {
  await postMysqlData(sql, data);
};
