import mongoose from 'mongoose';

import { faker } from '@faker-js/faker';

import dotenv from 'dotenv';

import Hotel from '../modules/hotel/hotel.model.js';

dotenv.config();

const INDIAN_CITIES = [
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Kolkata',
  'Chennai',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Goa',
  'Kochi',
  'Mysore',
  'Udaipur',
  'Shimla',
  'Manali',
  'Darjeeling',
  'Varanasi',
  'Amritsar',
  'Chandigarh',
  'Lucknow',
];

const seedHotels = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);

    console.log('Database connected');

    // DELETE ALL EXISTING HOTELS
    await Hotel.deleteMany({});

    console.log('Existing hotels deleted successfully');

    // MANUALLY CHANGE THIS OWNER ID
    const ownerID = '6a2379d5d8ee49c3f3c0750f';

    const hotels = [];

    for (let i = 0; i < 200; i++) {
      hotels.push({
        title: faker.company.name() + ' Hotel',

        description: faker.lorem.paragraph(),

        location: faker.helpers.arrayElement(INDIAN_CITIES),

        price: faker.number.int({
          min: 1000,
          max: 15000,
        }),

        images: [faker.image.urlPicsumPhotos()],

        amenities: faker.helpers.arrayElements(
          [
            'wifi',
            'pool',
            'parking',
            'gym',
            'spa',
            'restaurant',
            'bar',
            'laundry',
          ],
          {
            min: 3,
            max: 6,
          }
        ),

        owner: ownerID,
      });
    }

    await Hotel.insertMany(hotels);

    console.log('200 Indian hotels seeded successfully');

    process.exit(0);
  } catch (error) {
    console.log('Seeder Error:', error.message);

    process.exit(1);
  }
};

seedHotels();
