import { Request, Response } from 'express';

const login = (req: Request, res: Response) => {
  return res.status(200).json({
    userId: req.params.userId,
    name: 'Jim',
    email: 'jh@dm.com',
    isAdmin: false,
  });
};

const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // TODO: validation check
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
