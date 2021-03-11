import promiseRouter from 'express-promise-router';

import { getBoard } from '../api/board/get';
import { postBoard } from '../api/board/post';
import { getBetContents } from '../api/betContents/get';

const router = promiseRouter();

router.get('/client/board', getBoard);
router.post('/client/board', postBoard);
router.get('/client/contents', getBetContents);

export const clientRouter = router;
