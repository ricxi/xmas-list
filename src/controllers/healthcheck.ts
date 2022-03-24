// healthcheck is not really a resource, so it was not labelled as a controller
// maybe I should relable this to handler
import { Request, Response } from 'express';

const healthcheck = (req: Request, res: Response) => {
  const environment = process.env.NODE_ENV || 'unavailable';
  const version = process.env.APP_VERSION || 'unavailable';

  return res.status(200).json({
    status: 'available',
    sys_info: {
      environment,
      version,
    },
  });
};

export default healthcheck;
