import { postMysqlData } from './mysql';

export const postMyBoughtCoinData = async (sql: string, data) => {
  await postMysqlData(sql, data);
};
