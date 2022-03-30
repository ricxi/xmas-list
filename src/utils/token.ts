import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

// constant that stores the JWT_SECRET
// TODO: a better solution to type this variable
const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

/**
 * generate a json web token with a user's id
 *
 * @remarks
 * This method also validates JWT_SECRET environment varaible and the user's _id field
 *
 * @param _id - Should I try to assert _id as a string?
 * @returns A JSON web token string that expires in 25 days
 *
 * TODO: a better solution to type the id parameter
 */
const generateJwtById = (_id: Types.ObjectId | undefined): string => {
  if (JWT_SECRET === undefined) throw new Error('Invalid JWT_SECRET');

  if (typeof _id === undefined) throw new Error('Invalid _id field');

  return jwt.sign({ _id }, JWT_SECRET, {
    expiresIn: '25d',
  });
};

export { generateJwtById };
