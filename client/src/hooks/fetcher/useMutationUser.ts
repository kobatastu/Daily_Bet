import { useCallback, useState } from 'react';
import { mutationUser } from '../../infra/backend/mutationUser';
import type { PostUserData } from '../../serverTypes/userTypes';

export const useMutationUser = () => {
  const [mutating, setMutating] = useState(false);
  const mutate = useCallback(async (postUserData: PostUserData) => {
    try {
      setMutating(true);
      const userData = await mutationUser(postUserData);
      setMutating(false);
      return userData;
    } catch (e) {
      throw new Error(`cannot get the board data :${e}`);
    }
  }, []);
  return { mutating, mutate };
};
