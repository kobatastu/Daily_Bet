import { fetchBackend } from '../utils/fetchBackend';
import { isBoardDatasType } from '../../serverTypes/boardTypes';
import type { BoardData } from '../../serverTypes/boardTypes';

const convertDate = (data: unknown) => {
  try {
    const boardData = data as BoardData;
    return {
      ...boardData,
      created_at: new Date(boardData.created_at),
    };
  } catch (e) {
    throw new Error('cannot convert the date');
  }
};

const convertDateForArray = (datas: unknown) => {
  try {
    const boardDatas = datas as BoardData[];
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
