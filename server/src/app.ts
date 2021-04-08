import express from 'express';
import cors from 'cors';
import session from 'express-session';

import { loginRouter } from './routes/login';
import { clientRouter } from './routes/client';
import { UserData } from '../serverTypes/userTypes';

declare module 'express-session' {
  interface SessionData {
    login: UserData;
  }
}

const app = express();
const SERVER_PORT = process.env.port || 8080;
const sessionOpt = {
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(session(sessionOpt));

app.use(loginRouter);
app.use(clientRouter);

app.listen(SERVER_PORT, () => {
  console.log(`server started at ${SERVER_PORT}`);
});
