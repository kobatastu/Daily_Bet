import { getMyBetContentsData } from '../infra/mysql/myBetContents';

const sqlForGet =
  'SELECT * from bet_contents LEFT OUTER JOIN bet_coin ON bet_coin.bet_contents_id = bet_contents.id WHERE user_id = ? ORDER BY bet_coin.id DESC';

export const getMyBetContents = (userId: number) => getMyBetContentsData(sqlForGet, userId);
