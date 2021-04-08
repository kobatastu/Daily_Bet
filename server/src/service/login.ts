import bcrypt from 'bcrypt';
import { getUserData } from '../infra/mysql/user';

const sqlForPost = 'SELECT * from users where email =?';

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
