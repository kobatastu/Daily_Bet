import { fetchBackend } from '../utils/fetchBackend';
import type { PostBoardData } from '../../serverTypes/boardTypes';

export const mutationBoard = async (data: PostBoardData) => {
  const response = await fetchBackend('client/board', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.success) {
    throw new Error('response is not success');
  }
};
