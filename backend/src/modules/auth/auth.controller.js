import { registerUserService } from './auth.service.js';

export const registerUserController = async (req, res) => {
  try {
    console.log('Controller hit');
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
