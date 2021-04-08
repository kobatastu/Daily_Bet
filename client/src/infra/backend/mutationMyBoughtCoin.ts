import { fetchBackend } from '../utils/fetchBackend';
import type { PostMyBoughtCoinData } from '../../serverTypes/myBoughtCoinTypes';

export const mutationMyBoughtCoin = async (data: PostMyBoughtCoinData) => {
  const response = await fetchBackend('client/coinMarket', {
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
