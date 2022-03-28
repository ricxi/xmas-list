import { Request, Response } from 'express';

/**
 * login controller for the route  POST: /v1/users/:userId
 *
 * @param req
 * @param res
 *
 * TODO: Add validation
 *
 */
const login = (req: Request, res: Response) => {
  return res.status(200).json({
    userId: req.params.userId,
    name: 'Jim',
    email: 'jh@dm.com',
    isAdmin: false,
  });
};

/**
 * register controller for the route POST: /v1/users/
 *
 * @param req - receive POST request with name, email, and password in request body
 * @param res - send response status 201 with a json object that has the user's name, email, password, and a token
 *
 * TODO: improve validation check
 * FIXME: returns 'please include all fields' if incorrect json fields are included
 */
const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // validate that all fields are included
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('please include all fields');
  }

  const token = 'nice';

  return res.status(201).json({
    name,
    email,
    password,
    token,
  });
};

export default { login, register };
