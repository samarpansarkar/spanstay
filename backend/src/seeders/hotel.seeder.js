import mongoose from 'mongoose';

import { faker } from '@faker-js/faker';

import dotenv from 'dotenv';

import Hotel from '../modules/hotel/hotel.model.js';

import User from '../modules/auth/user.model.js';

dotenv.config();

const seedHotels = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/spanstay`);

    console.log('Database connected');

    //admin
    const ownerID = '6a231407a5a5ea6ef4825371';

    const hotels = [];

    for (let i = 0; i < 200; i++) {
      hotels.push({
        title: faker.company.name() + ' Hotel',

        description: faker.lorem.paragraph(),

        location: faker.location.city(),

        price: faker.number.int({
          min: 1000,
          max: 15000,
        }),

        images: [faker.image.urlPicsumPhotos()],

        amenities: ['wifi', 'pool', 'parking', 'gym'],

        owner: ownerID,
      });
    }

    await Hotel.insertMany(hotels);

    console.log('200 hotels seeded successfully');

    process.exit(0);
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedHotels();
