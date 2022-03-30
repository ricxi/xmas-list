import { NextFunction, Request, Response } from 'express';

/**
 * Wrap around async function to handle errors
 *
 * @remarks
 * This method will no longer be useful for express 5 and after
 *
 * @param func receive a middleware function
 * @returns A function that catches async errors and passes it to the error handler at the end of the middleware chain
 */
const asyncErrorWrapper = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<void>
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
};

export default asyncErrorWrapper;
