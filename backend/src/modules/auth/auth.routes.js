import { Router } from 'express';
import {
  registerUserController,
  signinUserController,
} from './auth.controller.js';
import { registerSchema, signinSchema } from './auth.validation.js';
import validate from '../../shared/middleware/validate.middleware.js';

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), registerUserController);

authRouter.post('/signin', validate(signinSchema), signinUserController);

export default authRouter;
