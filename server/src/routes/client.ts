import promiseRouter from 'express-promise-router';

import { getBoard } from '../api/board/get';
import { postBoard } from '../api/board/post';
import { getBetContents } from '../api/betContents/get';
import { getMyBetContents } from '../api/myBetContents/get';

const router = promiseRouter();

router.get('/client/board', getBoard);
router.post('/client/board', postBoard);
router.get('/client/contents', getBetContents);
router.get('/client/myBetContents', getMyBetContents);

export const clientRouter = router;
