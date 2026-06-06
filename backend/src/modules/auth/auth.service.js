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
import AppError from '../../shared/utils/AppError.js';

export const registerUserService = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    throw new AppError('user already exist!!!', 409);
  }

  const user = await createUser(userData);

  return user;
};

export const signinUserService = async (userData) => {
  const existingUser = await findUserPasswordByEmail(userData.email);

  if (!existingUser) {
    throw new AppError('User is not register!!!', 404);
  }

  const isPasswordMatched = await existingUser.comparePassword(
    userData.password
  );

  if (!isPasswordMatched) {
    throw new AppError('Invalid password!!', 401);
  }

  const payload = { id: existingUser._id, role: existingUser.role, email:existingUser.email };

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
    throw new AppError('No data found!!', 404);
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
    throw new AppError('Invalid refresh token signin again!!!', 401);
  }
};
