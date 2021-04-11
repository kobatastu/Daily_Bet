import { fetchBackend } from '../utils/fetchBackend';
import type { PostUserData } from '../../serverTypes/userTypes';
import { isUserDataType } from '../../serverTypes/userTypes';

export const mutationUser = async (data: PostUserData) => {
  const response = await fetchBackend('register', {
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
  if (response.data !== null && !isUserDataType(response.data)) {
    throw new Error('Type is not correct');
  }
  return response.data;
};
