import { getBoardData, postBoardData } from '../infra/mysql/board';

const sqlForGet = 'SELECT * from users RIGHT OUTER JOIN board ON board.user_id=users.id';
const sqlForPost = 'INSERT INTO board SET ?';

export const getBoard = () => getBoardData(sqlForGet);

export const postBoard = (data) => postBoardData(sqlForPost, { ...data, created_at: new Date() });
