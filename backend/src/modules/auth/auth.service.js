import jwt from 'jsonwebtoken';
import AppError from '../../shared/utils/AppError.js';
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

  const payload = {
    id: existingUser._id,
    role: existingUser.role,
    email: existingUser.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  existingUser.refreshToken = refreshToken;

  await existingUser.save();

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

export const refreshAccessTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError('Refresh token missing!!!', 401);
  }

  try {
    const decodeTokenData = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await findUserById(decodeTokenData.id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.refreshToken !== refreshToken) {
      throw new AppError('Invalid refresh token', 401);
    }

    const payload = {
      id: user._id,
      role: user.role,
      email: user.email,
    };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    user.refreshToken = newRefreshToken;

    await user.save();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new AppError('Invalid refresh token signin again!!!', 401);
  }
};

export const logoutService = async (userId) => {
  const user = findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  user.refreshToken = null;

  await user.save();
};
