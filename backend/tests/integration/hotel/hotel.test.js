import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../src/app.js';
import Hotel from '../../../src/modules/hotel/hotel.model.js';
import { setupTestUser } from '../../utils/authTestHelpers.js';
import { ROLES } from '../../../src/shared/constants/role.js';
import { generateMockHotelData } from '../../factories/hotel.factory.js';

describe('Hotel Module Integration Tests', () => {
  let platformAdminToken;
  let hotelAdminToken;
  let normalUserToken;

  beforeAll(async () => {
    const admin = await setupTestUser({ role: ROLES.ADMIN });
    platformAdminToken = admin.accessToken;

    const hotelAdmin = await setupTestUser({ role: ROLES.HOTEL_ADMIN });
    hotelAdminToken = hotelAdmin.accessToken;

    const normal = await setupTestUser({ role: ROLES.USER });
    normalUserToken = normal.accessToken;
  });

  describe('POST /api/v1/hotels/register-hotels', () => {
    it('should allow HOTEL_ADMIN to create a hotel', async () => {
      const hotelData = generateMockHotelData();

      const res = await request(app)
        .post('/api/v1/hotels/register-hotels')
        .set('Authorization', `Bearer ${hotelAdminToken}`)
        .field('title', hotelData.title)
        .field('description', hotelData.description)
        .field('location', hotelData.location)
        .field('price', hotelData.price);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(hotelData.title);
    });

    it('should deny USER from creating a hotel', async () => {
      const hotelData = generateMockHotelData();

      const res = await request(app)
        .post('/api/v1/hotels/register-hotels')
        .set('Authorization', `Bearer ${normalUserToken}`)
        .field('title', hotelData.title)
        .field('description', hotelData.description)
        .field('location', hotelData.location)
        .field('price', hotelData.price);

      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/v1/hotels', () => {
    it('should successfully retrieve list of approved hotels', async () => {
      const res = await request(app).get('/api/v1/hotels');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data.hotels)).toBe(true);
    });
  });
});
