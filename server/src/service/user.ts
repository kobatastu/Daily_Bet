import bcrypt from 'bcrypt';
import { getUserData, postUserData } from '../infra/mysql/user';

const sqlForPost = 'SELECT * from users where email =?';
const sqlForAdd = 'INSERT INTO users set ?';

export const checkLoginInfo = async (email: string, password: string) => {
  const user = await getUserData(sqlForPost, email);
  if (!user) return null;
  const { password: passwordFromDB, life_flag: lifeFlag } = user;
  // const hashedPassword = bcrypt.hashSync(password, 10);
  if (bcrypt.compareSync(password, passwordFromDB) && lifeFlag) {
    return user;
  }
  return null;
};

export const addUserInfo = async (email: string, password: string, name: string) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  await postUserData(sqlForAdd, email, hashedPassword, name);
  const user = await getUserData(sqlForPost, email);
  if (!user) return null;
  return user;
};
