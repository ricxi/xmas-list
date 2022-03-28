import { Request, Response } from 'express';

// TODO: change to POST
// @route  GET: /v1/users/:userId
const login = (req: Request, res: Response) => {
  return res.status(200).json({
    userId: req.params.userId,
    name: 'Jim',
    email: 'jh@dm.com',
    isAdmin: false,
  });
};

// TODO: improve validation check
// FIXME: returns 'please include all fields' if incorrect json fields are included
// @route  POST: /v1/users/
const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // validate that all fields are included
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'please include all fields' });
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
