import { useCallback, useState } from 'react';
import { queryLogin } from '../../infra/backend/queryLogin';

export const useQueryLogin = () => {
  const [querying, setQuerying] = useState(false);
  const query = useCallback(async (email: string, password: string) => {
    try {
      setQuerying(true);
      const userData = await queryLogin({ email, password });
      setQuerying(false);
      return userData;
    } catch (e) {
      throw new Error(`cannot get the user data :${e}`);
    }
  }, []);
  return { querying, query };
};
