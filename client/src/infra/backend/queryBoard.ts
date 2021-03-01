import { fetchBackend } from '../utils/fetchBackend';
import { BoardData, isBoardDatasType } from '../../serverTypes/boardTypes';

const convertDate = (BoardData: unknown) => {
  try {
    const boardData = BoardData as BoardData;
    return {
      ...boardData,
      created_at: new Date(boardData.created_at),
    };
  } catch (e) {
    throw new Error('cannot convert the date');
  }
};

const convertDateForArray = (BoardDatas: unknown) => {
  try {
    const boardDatas = BoardDatas as BoardData[];
    return boardDatas.map(convertDate);
  } catch (e) {
    throw new Error('cannot convert the dates');
  }
};

export const queryBoard = async () => {
  const response = await fetchBackend('client/board', {
    method: 'GET',
  });
  if (!response.success) {
    throw new Error('response is not success');
  }
  const data = convertDateForArray(response.data);
  if (!isBoardDatasType(data)) {
    throw new Error('Type is not correct');
  }
  return data;
};
