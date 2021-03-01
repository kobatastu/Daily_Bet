import promiseRouter from 'express-promise-router';

import { getBoard } from '../api/board/get';
import { postBoard } from '../api/board/post';

const router = promiseRouter();

router.get('/client/board', getBoard);
router.post('/client/board', postBoard);

export const clientRouter = router;
