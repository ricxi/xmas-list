import { Router } from 'express';
import controllers from '../controllers';
import { validate } from '../middleware/validator';
import { user } from '../schemas';

const router = Router();

// route for logging in a current user
router.post('/login', validate(user.LoginSchema), controllers.user.login);

// route for registering a new user
router.post(
  '/register',
  validate(user.RegisterSchema),
  controllers.user.register
);

export default router;
