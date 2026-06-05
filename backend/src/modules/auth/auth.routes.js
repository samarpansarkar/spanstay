import { Router } from 'express';
import {
  registerUserController,
  signinUserController,
  userProfileController,
} from './auth.controller.js';
import { registerSchema, signinSchema } from './auth.validation.js';
import validate from '../../shared/middleware/validate.middleware.js';
import protect from '../../shared/middleware/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), registerUserController);

authRouter.post('/signin', validate(signinSchema), signinUserController);

authRouter.get('/user-profile', protect, userProfileController);

export default authRouter;
