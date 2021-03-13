import promiseRouter from 'express-promise-router';

import { getBoard } from '../api/board/get';
import { postBoard } from '../api/board/post';
import { getBetContents } from '../api/betContents/get';
import { getMyBetContents } from '../api/myBetContents/get';
import { postCoinMarket } from '../api/coinMarket/post';

const router = promiseRouter();

router.get('/client/board', getBoard);
router.post('/client/board', postBoard);
router.get('/client/contents', getBetContents);
router.get('/client/myBetContents', getMyBetContents);
router.post('/client/coinMarket', postCoinMarket);

export const clientRouter = router;
