import { useCallback, useEffect, useState } from 'react';
import { queryMyBetContents } from '../../infra/backend/queryMyBetContents';
import type { MyBetContentsData } from '../../serverTypes/myBetContentsTypes';

export const useQueryMyBetContents = (userId: string) => {
  const [querying, setQuerying] = useState(false);
  const [data, setData] = useState<MyBetContentsData[] | null>(null);
  const queryData = useCallback(async () => {
    try {
      setQuerying(true);
      const myBetContentsDatas = await queryMyBetContents(userId);
      setData(myBetContentsDatas);
      setQuerying(false);
    } catch (e) {
      throw new Error(`cannot get the betContents data :${e}`);
    }
  }, []);

  useEffect(() => {
    queryData();
  }, []);
  return { querying, data, requery: queryData };
};
