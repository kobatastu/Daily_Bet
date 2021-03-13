import { useCallback, useEffect, useState } from 'react';
import { queryBoard } from '../../infra/backend/queryBoard';
import { BoardData } from '../../serverTypes/boardTypes';

export const useQueryBoard = () => {
  const [querying, setQuerying] = useState(false);
  const [data, setData] = useState<BoardData[] | null>(null);
  const queryData = useCallback(async () => {
    try {
      setQuerying(true);
      const boardData = await queryBoard();
      setData(boardData);
      setQuerying(false);
    } catch (e) {
      throw new Error(`cannot get the board data :${e}`);
    }
  }, []);

  useEffect(() => {
    queryData();
  }, []);
  return { querying, data, requery: queryData };
};
