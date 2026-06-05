import { Router } from 'express';
import { registerUserController } from './auth.controller.js';

const authRouter = Router();

authRouter.post('/register', registerUserController);

export default authRouter;
