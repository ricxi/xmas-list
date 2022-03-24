// healthcheck is not really a resource, so it
// was not labelled as a controller
import { Request, Response } from 'express';

const healthcheck = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'available',
    sys_info: {
      environment: process.env.APP_ENV,
      version: process.env.APP_VERSION,
    },
  });
};

export default healthcheck;
