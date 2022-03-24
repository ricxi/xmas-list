import { Router, Request, Response } from 'express';
import controllers from '../controllers';

const router = Router();

router.get('/:userId', controllers.user.login);

router.post('/', controllers.user.register);

export default router;
