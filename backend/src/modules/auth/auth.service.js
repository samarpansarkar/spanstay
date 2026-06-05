import jwt from 'jsonwebtoken';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../shared/utils/generateToken.js';
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserPasswordByEmail,
} from './auth.repository.js';

export const registerUserService = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = await createUser(userData);

  return user;
};

export const signinUserService = async (userData) => {
  const existingUser = await findUserPasswordByEmail(userData.email);

  if (!existingUser) {
    throw new Error('User is not register!!!');
  }

  const isPasswordMatched = await existingUser.comparePassword(
    userData.password
  );

  if (!isPasswordMatched) {
    throw new Error('Invalid password!!');
  }

  const payload = { id: existingUser._id, role: existingUser.role };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  let response = {
    user: {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    },
    accessToken,
    refreshToken,
  };
  return response;
};

export const userProfileService = async (userId) => {
  let user = await findUserById(userId);

  if (!user) {
    throw new Error('No data found!!');
  }

  return user;
};

export const refreshAccessTokenService = (refreshToken) => {
  try {
    const decodeTokenData = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const payload = {
      id: decodeTokenData.id,
      role: decodeTokenData.role,
    };

    const accessToken = generateAccessToken(payload);

    return accessToken;
  } catch (error) {
    throw new Error('Invalid refresh token signin again!!!');
  }
};
