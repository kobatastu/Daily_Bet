import { getMysqlData, postMysqlData } from './mysql';
import { isLawUserDatasType, convertUserData } from '../../../serverTypes/userTypes';

export const getUserData = async (sql: string, email: string) => {
  const userData = await getMysqlData(sql, email);

  if (!isLawUserDatasType(userData)) {
    throw new Error('Type is not correct');
  }
  if (userData.length === 0) return null;

  return convertUserData(userData[0]);
};

export const postUserData = async (sql: string, email: string, password: string, name: string) => {
  await postMysqlData(sql, {
    email,
    password,
    name,
    coin: 0,
    life_flag: 1,
    picture: 'default.jpeg',
  });
};
