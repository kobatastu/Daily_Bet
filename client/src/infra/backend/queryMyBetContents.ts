import { fetchBackend } from '../utils/fetchBackend';
import { isMyBetContentsDatasType } from '../../serverTypes/myBetContentsTypes';
import type { MyBetContentsData } from '../../serverTypes/myBetContentsTypes';

const convertDate = (data: unknown) => {
  try {
    const myBetContentsData = data as MyBetContentsData;
    return {
      ...myBetContentsData,
      expiration: new Date(myBetContentsData.expiration),
    };
  } catch (e) {
    throw new Error('cannot convert the date');
  }
};

const convertDateForArray = (datas: unknown) => {
  try {
    const myBetContentsDatas = datas as MyBetContentsData[];
    return myBetContentsDatas.map(convertDate);
  } catch (e) {
    throw new Error('cannot convert the dates');
  }
};

export const queryMyBetContents = async (userId: number) => {
  const response = await fetchBackend(`client/myBetContents?user_id=${userId}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.success) {
    throw new Error('response is not success');
  }
  if (!response.data) return [];
  const data = convertDateForArray(response.data);
  if (!isMyBetContentsDatasType(data)) {
    throw new Error('Type is not correct');
  }
  return data;
};
