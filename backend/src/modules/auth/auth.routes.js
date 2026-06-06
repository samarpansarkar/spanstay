import { Router } from 'express';
import {
  registerUserController,
  signinUserController,
  userProfileController,
} from './auth.controller.js';
import { registerSchema, signinSchema } from './auth.validation.js';
import validate from '../../shared/middleware/validate.middleware.js';
import protect from '../../shared/middleware/auth.middleware.js';
import { authLimiter } from '../../shared/middleware/rateLimit.middleware.js';

const authRouter = Router();

authRouter.post('/register',authLimiter, validate(registerSchema), registerUserController);

authRouter.post('/signin',authLimiter, validate(signinSchema), signinUserController);

authRouter.get('/user-profile',authLimiter, protect, userProfileController);

export default authRouter;
