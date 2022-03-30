import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

/**
 * generate a json web token with a user's id
 *
 * @param _id - should I try to assert _id as a string?
 * @returns A JSON web token string that expires in 25 days
 */
const generateJwtById = (_id: Types.ObjectId): string => {
  if (JWT_SECRET === undefined) throw new Error('Invalid JWT_SECRET');

  return jwt.sign({ _id }, JWT_SECRET, {
    expiresIn: '25d',
  });
};

export { generateJwtById };
