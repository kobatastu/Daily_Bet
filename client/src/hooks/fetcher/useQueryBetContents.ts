import { useCallback, useEffect, useState } from 'react';
import { queryBetContents } from '../../infra/backend/queryBetContents';
import type { BetContentsData } from '../../serverTypes/betContentsTypes';

export const useQueryBetContents = () => {
  const [querying, setQuerying] = useState(false);
  const [data, setData] = useState<BetContentsData[] | null>(null);
  const queryData = useCallback(async () => {
    try {
      console.log('ここ');
      setQuerying(true);
      const betContentsDatas = await queryBetContents();
      setData(betContentsDatas);
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
