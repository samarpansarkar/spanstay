import mongoose from 'mongoose';

import { faker } from '@faker-js/faker';

import dotenv from 'dotenv';

import Hotel from '../modules/hotel/hotel.model.js';
import Review from '../modules/review/review.model.js';

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

    await Hotel.deleteMany({});
    await Review.deleteMany({});

    console.log('Existing hotels and reviews deleted successfully');

    const ownerID = '6a2d083a643bacc8fb90efb4';

    const hotels = [];
    const allReviews = [];

    for (let i = 0; i < 200; i++) {
      const hotelId = new mongoose.Types.ObjectId();
      const reviewIds = [];

      const numReviews = faker.number.int({ min: 2, max: 5 });
      for (let j = 0; j < numReviews; j++) {
        const reviewId = new mongoose.Types.ObjectId();
        allReviews.push({
          _id: reviewId,
          hotel: hotelId,
          user: ownerID,
          rating: faker.number.int({ min: 3, max: 5 }),
          comment: faker.lorem.sentences({ min: 1, max: 3 }),
        });
        reviewIds.push(reviewId);
      }

      hotels.push({
        _id: hotelId,
        title: faker.company.name() + ' Hotel',

        description: faker.lorem.paragraph(),

        location: faker.helpers.arrayElement(INDIAN_CITIES),

        price: faker.number.int({
          min: 1000,
          max: 15000,
        }),

        images: [{ url: faker.image.urlPicsumPhotos({ width: 800, height: 500 }), publicId: 'seed' }],

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
        reviews: reviewIds,
        isAvailable: Math.random() > 0.1,
      });
    }

    await Hotel.insertMany(hotels);
    await Review.insertMany(allReviews);

    console.log(`200 Indian hotels and ${allReviews.length} reviews seeded successfully`);

    process.exit(0);
  } catch (error) {
    console.log('Seeder Error:', error.message);

    process.exit(1);
  }
};

seedHotels();
