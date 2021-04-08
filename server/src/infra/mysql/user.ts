import { getMysqlData } from './mysql';
import { isLawUserDatasType, convertUserData } from '../../../serverTypes/userTypes';

export const getUserData = async (sql: string, email: string) => {
  const userData = await getMysqlData(sql, email);

  if (!isLawUserDatasType(userData)) {
    throw new Error('Type is not correct');
  }
  if (userData.length === 0) return null;

  return convertUserData(userData[0]);
};
