import { faker } from '@faker-js/faker';
import User from '../../src/modules/auth/user.model.js';
import { ROLES } from '../../src/shared/constants/role.js';

export const generateMockUserData = (overrides = {}) => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: 'Password123!',
    phone: '+1' + faker.string.numeric(10),
    role: ROLES.USER,
    isVerified: true,
    status: 'ACTIVE',
    ...overrides,
  };
};

export const createMockUser = async (overrides = {}) => {
  const userData = generateMockUserData(overrides);
  const user = await User.create(userData);
  return user;
};

export const createMockAdmin = async (overrides = {}) => {
  return createMockUser({ role: ROLES.ADMIN, ...overrides });
};

export const createMockHotelAdmin = async (overrides = {}) => {
  return createMockUser({ role: ROLES.HOTEL_ADMIN, ...overrides });
};
