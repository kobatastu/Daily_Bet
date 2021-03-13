import { useCallback, useState } from 'react';
import { mutationMyBoughtCoin } from '../../infra/backend/mutationMyBoughtCoin';
import type { PostMyBoughtCoinData } from '../../serverTypes/myBoughtCoinTypes';

export const useMutationMyBoughtCoin = () => {
  const [mutating, setMutating] = useState(false);
  const mutate = useCallback(async (myBoughtCoinData: PostMyBoughtCoinData) => {
    try {
      setMutating(true);
      await mutationMyBoughtCoin(myBoughtCoinData);
      setMutating(false);
    } catch (e) {
      throw new Error(`cannot get the board data :${e}`);
    }
  }, []);
  return { mutating, mutate };
};
