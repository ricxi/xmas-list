import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

/**
 * Returns a JSON wrapped error to the client
 *
 * @remarks
 * Set status code to 500 internal server error if no
 * status code is found in the response
 *
 * @param res - used to get and set the status code
 * @param err - used to get the error message
 */
const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default errorHandler;
