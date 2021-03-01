import express from 'express';
import cors from 'cors';

import { clientRouter } from './routes/client';

const app = express();
const SERVER_PORT = process.env.port || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(clientRouter);

app.listen(SERVER_PORT, () => {
  console.log(`server started at ${SERVER_PORT}`);
});
