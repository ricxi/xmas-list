import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { generateJwtById } from '../utils';
import services from '../services';

/**
 * login controller for the route  POST: /v1/users/login
 *
 * @param req - receive POST request with email, and password in request body
 * @param res - send response status 200 with a json object that has the user's info and a token
 *
 * TODO: Password hashing
 *
 */
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email) throw new Error('email is missing');
    if (!password) throw new Error('password cannot be blank');

    const user = await services.user.getByEmail(email);

    if (!user) throw new Error('a user with this email does not exist');

    const token = generateJwtById(user._id);

    const userInfo = {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    };

    return res.status(200).json(userInfo);
  } catch (error: any) {
    return res.status(400).json({
      errors: {
        message: ['unable to log in user', error.message],
        stack: process.env.NODE_ENV === 'development' ? error.stack : null,
      },
    });
  }
};

/**
 * register controller for the route POST: /v1/users/register
 *
 * @param req - receive POST request with name, email, and password in request body
 * @param res - send response status 201 with a json object that has the user's name, email, password, and a token
 *
 * TODO: improve validation check
 * FIXME: returns 'please include all fields' if incorrect json fields are included
 */
const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // validate that all fields are included
    if (!name || !email || !password)
      throw new Error('please include all fields');

    const userExists = await services.user.exists(email);

    if (userExists) {
      res.status(400);
      throw new Error('user already exists');
    }

    const user = await services.user.create(req.body);

    const token = generateJwtById(user._id);

    return res.status(201).json({
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error: any) {
    res.status(400).json({
      errors: {
        message: ['unable to register user', error.message],
        stack: process.env.NODE_ENV === 'development' ? error.stack : null,
      },
    });
  }
};

export default { login, register };
