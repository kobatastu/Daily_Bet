import { useCallback, useState } from 'react';
import { queryLogin } from '../../infra/backend/queryLogin';
import type { PostLoginData } from '../../serverTypes/userTypes';

export const useQueryLogin = () => {
  const [querying, setQuerying] = useState(false);
  const query = useCallback(async (postLoginData: PostLoginData) => {
    try {
      setQuerying(true);
      const userData = await queryLogin(postLoginData);
      setQuerying(false);
      return userData;
    } catch (e) {
      throw new Error(`cannot get the user data :${e}`);
    }
  }, []);
  return { querying, query };
};
