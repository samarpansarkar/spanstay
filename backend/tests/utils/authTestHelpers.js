import jwt from 'jsonwebtoken';
import { createMockUser } from '../factories/user.factory.js';

export const generateTestTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET || 'test_jwt_secret',
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET || 'test_refresh_secret',
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export const setupTestUser = async (overrides = {}) => {
  // Use a fallback JWT secret if env isn't loaded
  process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'test_jwt_secret';
  process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test_refresh_secret';
  
  const user = await createMockUser(overrides);
  const { accessToken, refreshToken } = generateTestTokens(user);
  
  return {
    user,
    accessToken,
    refreshToken,
    authHeader: `Bearer ${accessToken}`,
    cookieHeader: `refreshToken=${refreshToken}`
  };
};
