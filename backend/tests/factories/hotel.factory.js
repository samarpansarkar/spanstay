import { faker } from '@faker-js/faker';

export const generateMockHotelData = (overrides = {}) => {
  return {
    title: faker.company.name() + ' Hotel',
    description: faker.lorem.paragraph(),
    location: faker.location.city(),
    price: faker.number.int({ min: 1000, max: 15000 }),
    images: [
      {
        url: faker.image.url(),
        publicId: 'mock-public-id',
      },
    ],
    amenities: ['wifi', 'pool', 'parking'],
    ...overrides,
  };
};
