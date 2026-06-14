import { Router } from 'express';
import protect from '../../shared/middleware/auth.middleware.js';
import { authLimiter } from '../../shared/middleware/rateLimit.middleware.js';
import validate from '../../shared/middleware/validate.middleware.js';
import {
  logoutController,
  refreshTokenController,
  registerUserController,
  signinUserController,
  testEmail,
  userProfileController,
  forgotPasswordController,
  resetPasswordController,
} from './auth.controller.js';
import { registerSchema, signinSchema, forgotPasswordSchema, resetPasswordSchema } from './auth.validation.js';

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

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Unauthorized
 */
authRouter.post('/refresh-token', authLimiter, refreshTokenController);

/**
 * @swagger
 * /auth/test-email:
 *   get:
 *     summary: Test email configuration
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Email sent successfully
*/
authRouter.get('/test-email', testEmail);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset link
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
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Reset link sent to email
 *       404:
 *         description: User not found
 */
authRouter.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), forgotPasswordController);

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   patch:
 *     summary: Reset user password
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: NewPassword@123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired token
 */
authRouter.patch('/reset-password/:token', authLimiter, validate(resetPasswordSchema), resetPasswordController);

export default authRouter;