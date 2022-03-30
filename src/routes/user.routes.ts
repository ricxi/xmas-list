import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

// route for logging in a current user
router.post('/login', controllers.user.login);

// route for registering a new user
router.post('/register', controllers.user.register);

export default router;
