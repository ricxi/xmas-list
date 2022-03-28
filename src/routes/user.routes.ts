import { Router, Request, Response } from 'express';
import controllers from '../controllers';

const router = Router();

// route for logging in a current user
router.get('/:userId', controllers.user.login);

// route for registering a new user
router.post('/', controllers.user.register);

export default router;
