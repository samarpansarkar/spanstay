import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../src/app.js';
import User from '../../../src/modules/auth/user.model.js';
import { setupTestUser } from '../../utils/authTestHelpers.js';
import { generateMockUserData } from '../../factories/user.factory.js';

describe('Auth Module Integration Tests', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should successfully register a new user', async () => {
      const userData = generateMockUserData();
      
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          phone: userData.phone,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Registration successfull!!');
      
      // Verify user was created in DB
      const userInDb = await User.findOne({ email: userData.email });
      expect(userInDb).toBeTruthy();
      expect(userInDb.isVerified).toBe(false); // Should be false initially
    });

    it('should fail registration with duplicate email', async () => {
      const { user } = await setupTestUser();
      
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Duplicate User',
          email: user.email, // Using already registered email
          password: 'Password123!',
          phone: '+1987654321',
        });

      expect(res.status).toBe(409); // Conflict based on service
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('user already exist!!!');
    });

    it('should fail registration with missing required fields', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test User',
          // missing email, password, phone
        });

      expect(res.status).toBe(400); // Bad Request (Validation Error)
    });
  });

  describe('POST /api/v1/auth/signin', () => {
    it('should successfully login with valid credentials', async () => {
      const password = 'Password123!';
      const { user } = await setupTestUser({ password, isVerified: true });

      const res = await request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: user.email,
          password: password,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('accessToken');
      
      // Verify refresh token is set in cookies
      const cookies = res.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toMatch(/refreshToken=/);
    });

    it('should fail login with invalid email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'nonexistent@example.com',
          password: 'Password123!',
        });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('User is not register!!!');
    });

    it('should fail login with invalid password', async () => {
      const { user } = await setupTestUser({ password: 'CorrectPassword123!', isVerified: true });

      const res = await request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: user.email,
          password: 'WrongPassword123!',
        });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid password!!');
    });

    it('should fail login with unverified account', async () => {
      const password = 'Password123!';
      const { user } = await setupTestUser({ password, isVerified: false }); // Unverified user

      const res = await request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: user.email,
          password: password,
        });

      expect(res.status).toBe(403);
      expect(res.body.message).toBe('Please verify your email address before signing in.');
    });
  });
});
