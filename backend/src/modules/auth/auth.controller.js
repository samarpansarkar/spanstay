import { success } from 'zod';
import asyncHandler from '../../shared/utils/asyncHandler.js';
import sendResponse from '../../shared/utils/SendResponse.js';
import {
  refreshAccessTokenService,
  registerUserService,
  signinUserService,
  userProfileService,
} from './auth.service.js';

export const registerUserController = asyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Registration successfull!!',
    data: user,
  });
});

export const signinUserController = asyncHandler(async (req, res) => {
  const response = await signinUserService(req.body);

  res.cookie('refreshToken', response.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Signin successFul',
    data: {
      user: response.user,
      accessToken: response.accessToken,
    },
  });
});

export const userProfileController = asyncHandler(async (req, res) => {
  const user = await userProfileService(req.user.id);

  sendResponse(res, { success: true, data: user });
});

export const refreshTokenController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const accessToken = await refreshAccessTokenService(refreshToken);

  sendResponse(res, { statusCode: 200, success: true, data: accessToken });
});
