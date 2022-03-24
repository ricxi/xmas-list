import { Express, Request, Response } from 'express';

const routes = (app: Express) => {
  // basic check to ensure that the server is up, remove before prod
  app.get('/', (req: Request, res: Response) => {
    return res.status(200).send('api is up and running...');
  });

  app.get('/v1/healthcheck', (req: Request, res: Response) => {
    return res.status(200).json({
      status: 'available',
      system_info: {
        environment: process.env.APP_ENV,
        version: process.env.APP_VERSION,
      },
    });
  });
};

export default routes;
