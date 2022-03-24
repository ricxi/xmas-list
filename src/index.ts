import 'dotenv/config';
import express, { Request, Response } from 'express';
import routes from './routes';

const app = express();

routes(app);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}...`);
});
