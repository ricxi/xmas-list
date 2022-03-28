import 'dotenv/config';
import express from 'express';
import db from './config/db';
import errorHandler from './middleware/errorHandler';
import routes from './routes/index';

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// simple health checkup
app.use('/v1/healthcheck', routes.healthcheck);

// routes for user resource
app.use('/v1/users', routes.user);

// place error handler middleware here
app.use(errorHandler);

const PORT = process.env.PORT || 9000;

app.listen(PORT, async () => {
  await db.connect();
  console.log(`Server is listening on port ${PORT}...`);
});
