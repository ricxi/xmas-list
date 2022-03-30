import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { errorWrapper, generateJwtById } from '../utils';
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

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Incorrect password');

    const token = generateJwtById(user._id);

    const userInfo = {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    };

    return res.status(200).json(userInfo);
  } catch (error: any) {
    return res.status(400).json(errorWrapper(error, 'unable to log in user'));
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

    if (await services.user.exists(email)) {
      res.status(400);
      throw new Error('user already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userInput = {
      name,
      email,
      password: hashedPassword,
    };

    // Do I need to check if a user was created?
    const user = await services.user.create(userInput);

    const token = generateJwtById(user._id);

    return res.status(201).json({
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error: any) {
    res.status(400).json(errorWrapper(error, 'unable to register user'));
  }
};

export default { login, register };
