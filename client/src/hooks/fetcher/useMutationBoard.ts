import { useCallback, useState } from 'react';
import { mutationBoard } from '../../infra/backend/mutationBoard';
import type { PostBoardData } from '../../serverTypes/boardTypes';

export const useMutationBoard = () => {
  const [mutating, setMutating] = useState(false);
  const mutate = useCallback(async (boardData: PostBoardData) => {
    try {
      setMutating(true);
      await mutationBoard(boardData);
      setMutating(false);
    } catch (e) {
      throw new Error(`cannot get the board data :${e}`);
    }
  }, []);
  return { mutating, mutate };
};
