import { fetchBackend } from '../utils/fetchBackend';
import { isBetContentsDatasType } from '../../serverTypes/betContentsTypes';
import type { BetContentsData } from '../../serverTypes/betContentsTypes';

const convertDate = (data: unknown) => {
  try {
    const betContentsData = data as BetContentsData;
    return {
      ...betContentsData,
      expiration: new Date(betContentsData.expiration),
    };
  } catch (e) {
    throw new Error('cannot convert the date');
  }
};

const convertDateForArray = (datas: unknown) => {
  try {
    const betContentsDatas = datas as BetContentsData[];
    return betContentsDatas.map(convertDate);
  } catch (e) {
    throw new Error('cannot convert the dates');
  }
};

export const queryBetContents = async () => {
  const response = await fetchBackend('client/contents', {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.success) {
    throw new Error('response is not success');
  }
  const data = convertDateForArray(response.data);
  if (!isBetContentsDatasType(data)) {
    throw new Error('Type is not correct');
  }
  return data;
};
