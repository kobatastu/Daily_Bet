import promiseRouter from 'express-promise-router';

import { postLoginInfo } from '../api/login/post';
import { postRegisterUserInfo } from '../api/register/post';
import { handleError } from '../middleware/common';
import { errorCodeMap } from '../../serverTypes/apiTypes';

const router = promiseRouter();

router.post('/login', postLoginInfo);
router.post('/register', postRegisterUserInfo);

router.use(handleError(500, { success: false, errorCode: errorCodeMap.internalServerError }));

export const loginRouter = router;
