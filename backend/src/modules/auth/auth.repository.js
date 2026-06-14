import User from './user.model.js';

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const createUser = async (userData) => {
  return await User.create(userData);
};

export const findUserPasswordByEmail = async (email) => {
  return await User.findOne({ email }).select('+password');
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const findUserByResetToken = async (hashedToken) => {
  return await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
};
