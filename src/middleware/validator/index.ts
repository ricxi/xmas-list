import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

/**
 * Validate incoming requests against a schema
 *
 * @remarks
 * validate the request body, query parameters, and url parameters
 *
 * @param schema - used to validate an incoming request
 * @returns - a function
 */
const validate = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('Here'.toUpperCase());
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      return res.status(400).json(error.errors);
    }
  };
};

export { validate };
