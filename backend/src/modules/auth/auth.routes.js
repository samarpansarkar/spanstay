
import { Router } from 'express';
import { registerUserController } from './auth.controller.js';
import { registerSchema } from './auth.validation.js';
import validate from '../../shared/middleware/validate.middleware.js';

const authRouter = Router();

authRouter.post('/register',(req, res, next) => {
    console.log('Route hit');

    next();
  },
   validate(registerSchema),
   registerUserController
);

export default authRouter;
