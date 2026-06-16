import request from 'supertest';
import app from '../../../src/app.js';
import User from '../../../src/modules/auth/user.model.js';
import { setupTestUser } from '../../utils/authTestHelpers.js';
import { generateMockUserData } from '../../factories/user.factory.js';

import crypto from 'crypto';

describe('Auth Module - Verification & Password Reset', () => {
  describe('POST /api/v1/auth/verify-email', () => {
    it('should verify email with valid token', async () => {
      const userData = generateMockUserData({ isVerified: false });
      const rawOtp = '123456';
      
      userData.verificationToken = crypto.createHash('sha256').update(rawOtp).digest('hex');
      userData.verificationTokenExpire = Date.now() + 3600000; // 1 hour from now
      
      await User.create(userData);

      const res = await request(app)
        .post('/api/v1/auth/verify-email')
        .send({ email: userData.email, otp: rawOtp });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      
      const user = await User.findOne({ email: userData.email });
      expect(user.isVerified).toBe(true);
      expect(user.verificationToken).toBeUndefined();
    });

    it('should fail with expired token', async () => {
      const userData = generateMockUserData({ isVerified: false });
      const rawOtp = '123456';
      userData.verificationToken = crypto.createHash('sha256').update(rawOtp).digest('hex');
      userData.verificationTokenExpire = Date.now() - 3600000; // 1 hour ago
      
      await User.create(userData);

      const res = await request(app)
        .post('/api/v1/auth/verify-email')
        .send({ email: userData.email, otp: rawOtp });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Invalid or expired verification code');
    });
  });

  describe('POST /api/v1/auth/forgot-password', () => {
    it('should send reset email for valid user', async () => {
      const { user } = await setupTestUser();

      const res = await request(app)
        .post('/api/v1/auth/forgot-password')
        .send({ email: user.email });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should fail for non-existent user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/forgot-password')
        .send({ email: 'nonexistent@example.com' });

      expect(res.status).toBe(404);
    });
  });
});
