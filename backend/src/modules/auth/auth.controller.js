import {
  refreshAccessTokenService,
  registerUserService,
  signinUserService,
} from './auth.service.js';

export const registerUserController = async (req, res) => {
  try {
    const user = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      message: 'Registration successfull!!',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const signinUserController = async (req, res) => {
  try {
    const response= await signinUserService(req.body);

    res.cookie('refreshToken',response.refreshToken,{
      httpOnly:true,
      secure:true,
      sameSite:'Strict',
      maxAge:7*24*60*60*1000,
    }).status(200).json({
      success: true,
      message: 'Signin successfull!!',
      data: response?.user,
      accessToken:response?.accessToken,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const refreshTokenController = async(req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const accessToken = await refreshAccessTokenService(refreshToken);

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
