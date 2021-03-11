import { getBetContentsData } from '../infra/mysql/betContents';

const sqlForGet = 'SELECT * from bet_contents';

export const getBetContents = () => getBetContentsData(sqlForGet);
