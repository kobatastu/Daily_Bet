import promiseRouter from 'express-promise-router';

import { postLoginInfo } from '../api/login/post';

const router = promiseRouter();

router.post('/login', postLoginInfo);

export const loginRouter = router;
