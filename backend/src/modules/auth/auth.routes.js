import { Router } from 'express';
import protect from '../../shared/middleware/auth.middleware.js';
import { authLimiter } from '../../shared/middleware/rateLimit.middleware.js';
import validate from '../../shared/middleware/validate.middleware.js';
import {
  logoutController,
  registerUserController,
  signinUserController,
  userProfileController,
} from './auth.controller.js';
import { registerSchema, signinSchema } from './auth.validation.js';

const authRouter = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Samarpan Sarkar
 *               email:
 *                 type: string
 *                 example: samarpan@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: Registration successful
 *       409:
 *         description: User already exists
 */
authRouter.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  registerUserController
);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: User signin
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: samarpan@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Signin successful
 *       401:
 *         description: Invalid credentials
 */

authRouter.post(
  '/signin',
  authLimiter,
  validate(signinSchema),
  signinUserController
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */

authRouter.post('/logout', protect, logoutController);

/**
 * @swagger
 * /auth/user-profile:
 *   get:
 *     summary: Get current user profile
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *       401:
 *         description: Unauthorized
 */

authRouter.get('/user-profile', authLimiter, protect, userProfileController);

export default authRouter;
