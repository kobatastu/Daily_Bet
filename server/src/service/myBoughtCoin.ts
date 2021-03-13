import { postMyBoughtCoinData } from '../infra/mysql/myBoughtCoin';

const sqlForPost = 'UPDATE users SET coin = coin + ? WHERE id = ?';

export const postMyBoughtCoin = (myBoughtCoin: number, userId: number) =>
  postMyBoughtCoinData(sqlForPost, [myBoughtCoin, userId]);
