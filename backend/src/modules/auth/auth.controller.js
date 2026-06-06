import asyncHandler from '../../shared/utils/asyncHandler.js';
import {
  refreshAccessTokenService,
  registerUserService,
  signinUserService,
  userProfileService,
} from './auth.service.js';

export const registerUserController = asyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);

  res.status(201).json({
    success: true,
    message: 'Registration successfull!!',
    data: user,
  });
});

export const signinUserController = asyncHandler(async (req, res) => {
  const response = await signinUserService(req.body);

  res
    .cookie('refreshToken', response.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      success: true,
      message: 'Signin successfull!!',
      data: response?.user,
      accessToken: response?.accessToken,
    });
});

export const userProfileController = asyncHandler(async (req, res) => {
  const user = await userProfileService(req.user.id);

  res.status(200).json({ success: true, data: user });
});

export const refreshTokenController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const accessToken = await refreshAccessTokenService(refreshToken);

  res.status(200).json({
    success: true,
    accessToken,
  });
});
