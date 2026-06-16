import request from 'supertest';
import app from '../../../src/app.js';
import { setupTestUser } from '../../utils/authTestHelpers.js';
import { ROLES } from '../../../src/shared/constants/role.js';
import Hotel from '../../../src/modules/hotel/hotel.model.js';
import Booking from '../../../src/modules/booking/booking.model.js';

describe('Booking Module Integration Tests', () => {
  let normalUser;
  let normalUserToken;
  let hotelAdmin;
  let hotelAdminToken;
  let testHotel;

  beforeEach(async () => {
    // Because setup.js clears DB afterEach, recreate necessary data
    normalUser = await setupTestUser({ role: ROLES.USER });
    normalUserToken = normalUser.accessToken;

    hotelAdmin = await setupTestUser({ 
      role: ROLES.HOTEL_ADMIN, 
      email: 'hoteladmin_booking@test.com' 
    });
    hotelAdminToken = hotelAdmin.accessToken;

    testHotel = await Hotel.create({
      title: 'Test Booking Hotel',
      description: 'A great place to stay',
      location: 'New York',
      price: 200,
      owner: hotelAdmin.user._id,
      images: [{ url: 'http://example.com/image.jpg', publicId: 'img1' }],
    });
  });

  afterAll(async () => {
    await Hotel.deleteMany({});
    await Booking.deleteMany({});
  });

  describe('POST /api/v1/bookings', () => {
    it('should allow user to create a booking', async () => {
      const now = Date.now();
      const res = await request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${normalUserToken}`)
        .send({
          hotelId: testHotel._id.toString(),
          checkIn: new Date(now + 86400000).toISOString(), // Tomorrow
          checkOut: new Date(now + 86400000 * 3).toISOString(), // In 3 days
          guests: 2
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.hotel).toBe(testHotel._id.toString());
      expect(res.body.data.totalPrice).toBe(400); // exactly 2 nights * 200
    });

    it('should return 400 for invalid dates', async () => {
      const res = await request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${normalUserToken}`)
        .send({
          hotelId: testHotel._id.toString(),
          checkIn: 'invalid-date',
          checkOut: new Date(Date.now() + 86400000 * 3).toISOString(),
          guests: 2
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should deny unauthenticated requests', async () => {
      const res = await request(app)
        .post('/api/v1/bookings')
        .send({
          hotelId: testHotel._id.toString(),
          checkIn: new Date(Date.now() + 86400000).toISOString(),
          checkOut: new Date(Date.now() + 86400000 * 3).toISOString(),
          guests: 2
        });
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/v1/bookings/my-bookings', () => {
    it('should deny unauthenticated requests', async () => {
      const res = await request(app).get('/api/v1/bookings/my-bookings');
      expect(res.status).toBe(401);
    });

    it('should allow user to get their own bookings', async () => {
      await Booking.create({
        user: normalUser.user._id,
        hotel: testHotel._id,
        checkIn: new Date(),
        checkOut: new Date(Date.now() + 86400000),
        guests: 2,
        totalPrice: 200
      });

      const res = await request(app)
        .get('/api/v1/bookings/my-bookings')
        .set('Authorization', `Bearer ${normalUserToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('GET /api/v1/bookings/hotel-bookings', () => {
    it('should deny USER role', async () => {
      const res = await request(app)
        .get('/api/v1/bookings/hotel-bookings')
        .set('Authorization', `Bearer ${normalUserToken}`);
      expect(res.status).toBe(403);
    });

    it('should allow HOTEL_ADMIN to get their hotel bookings', async () => {
      await Booking.create({
        user: normalUser.user._id,
        hotel: testHotel._id,
        checkIn: new Date(),
        checkOut: new Date(Date.now() + 86400000),
        guests: 2,
        totalPrice: 200
      });

      const res = await request(app)
        .get('/api/v1/bookings/hotel-bookings')
        .set('Authorization', `Bearer ${hotelAdminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('PATCH /api/v1/bookings/:bookingId/confirm', () => {
    let bookingId;
    beforeEach(async () => {
      const booking = await Booking.create({
        user: normalUser.user._id,
        hotel: testHotel._id,
        checkIn: new Date(),
        checkOut: new Date(Date.now() + 86400000),
        guests: 2,
        totalPrice: 200
      });
      bookingId = booking._id.toString();
    });

    it('should deny USER role from confirming booking', async () => {
      const res = await request(app)
        .patch(`/api/v1/bookings/${bookingId}/confirm`)
        .set('Authorization', `Bearer ${normalUserToken}`);
      expect(res.status).toBe(403);
    });

    it('should allow HOTEL_ADMIN to confirm booking', async () => {
      const res = await request(app)
        .patch(`/api/v1/bookings/${bookingId}/confirm`)
        .set('Authorization', `Bearer ${hotelAdminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('confirmed');
    });
  });

  describe('PATCH /api/v1/bookings/:bookingId/cancel', () => {
    let bookingId;
    beforeEach(async () => {
      const booking = await Booking.create({
        user: normalUser.user._id,
        hotel: testHotel._id,
        checkIn: new Date(),
        checkOut: new Date(Date.now() + 86400000),
        guests: 2,
        totalPrice: 200
      });
      bookingId = booking._id.toString();
    });

    it('should allow USER to cancel their booking', async () => {
      const res = await request(app)
        .patch(`/api/v1/bookings/${bookingId}/cancel`)
        .set('Authorization', `Bearer ${normalUserToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('cancelled');
    });

    it('should return 404 for nonexistent booking', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app)
        .patch(`/api/v1/bookings/${fakeId}/cancel`)
        .set('Authorization', `Bearer ${normalUserToken}`);

      expect(res.status).toBe(404);
    });
  });
});
