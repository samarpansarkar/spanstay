import { createUser, findUserByEmail } from './auth.repository.js';

export const registerUserService = async (userData) => {
  console.log("Auth service hit!!");
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = await createUser(userData);

  return user;
};
