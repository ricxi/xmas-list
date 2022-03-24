import { Express, Request, Response } from 'express';
import healthcheck from './controllers/healthcheck';

const routes = (app: Express) => {
  // basic check to ensure that the server is up, remove before prod
  app.get('/', (req: Request, res: Response) => {
    return res.status(200).send('api is up and running...');
  });

  app.get('/v1/healthcheck', healthcheck);
};

export default routes;
