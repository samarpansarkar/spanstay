import {
  refreshTokenCookieConfig,
  refreshTokenCookieOptions,
} from '../../config/cookieOptions.js';
import asyncHandler from '../../shared/utils/asyncHandler.js';
import sendResponse from '../../shared/utils/SendResponse.js';
import {
  logoutService,
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

  res.cookie('refreshToken', response.refreshToken, refreshTokenCookieConfig);

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

  const result = await refreshAccessTokenService(refreshToken);

  res.cookie('refreshToken', result.refreshToken, refreshTokenCookieConfig);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access token refreshed successfully',
    data: { accessToken: result.accessToken },
  });
});

export const logoutController = asyncHandler(async (req, res) => {
  await logoutService(req.user.id);

  res.clearCookie('refreshToken', refreshTokenCookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logout successful',
  });
});
