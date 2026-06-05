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
