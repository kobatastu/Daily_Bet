import { guardRunTimeError } from '../common/guardRunTimeError';

export type BoardData = {
  id: number;
  name: string;
  coin: number;
  picture: string;
  user_id: number;
  board_content: string;
  created_at: Date;
};

export type PostBoardData = {
  user_id: string;
  board_content: string;
};

const isBoardDataType = (data: unknown): data is BoardData =>
  guardRunTimeError(() => {
    const {
      id,
      name,
      coin,
      picture,
      user_id: userId,
      board_content: boardContent,
      created_at: createdAt,
    } = data as BoardData;
    if (
      typeof id === 'number' &&
      typeof name === 'string' &&
      typeof coin === 'number' &&
      typeof picture === 'string' &&
      typeof userId === 'number' &&
      typeof boardContent === 'string' &&
      createdAt instanceof Date
    ) {
      return true;
    } else {
      return false;
    }
  });

export const isBoardDatasType = (data: unknown): data is BoardData[] =>
  guardRunTimeError(() => {
    const boardDatas = data as BoardData[];
    if (boardDatas.every((data) => isBoardDataType(data))) return true;
    return false;
  });
