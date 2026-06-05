/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags:
 *       - Auth
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               name:
 *                 type: string
 *
 *               email:
 *                 type: string
 *
 *               password:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 */

import { Router } from 'express';
import { registerUserController } from './auth.controller.js';
import { registerSchema } from './auth.validation.js';
import validate from '../../shared/middleware/validate.middleware.js';

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), registerUserController);

export default authRouter;
