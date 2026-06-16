import request from 'supertest';
import app from '../../../src/app.js';
import { setupTestUser } from '../../utils/authTestHelpers.js';
import { ROLES } from '../../../src/shared/constants/role.js';
import Hotel from '../../../src/modules/hotel/hotel.model.js';
import Booking from '../../../src/modules/booking/booking.model.js';
import Review from '../../../src/modules/review/review.model.js';

describe('Review Module Integration Tests', () => {
  let normalUser;
  let normalUserToken;
  let anotherUserToken;
  let testHotel;
  let testBooking;

  beforeEach(async () => {
    // Because setup.js clears DB afterEach, recreate necessary data
    normalUser = await setupTestUser({ role: ROLES.USER });
    normalUserToken = normalUser.accessToken;

    const anotherUser = await setupTestUser({ 
      role: ROLES.USER, 
      email: 'anotheruser@test.com' 
    });
    anotherUserToken = anotherUser.accessToken;

    const adminUser = await setupTestUser({ 
      role: ROLES.HOTEL_ADMIN, 
      email: 'hoteladmin_review@test.com' 
    });

    testHotel = await Hotel.create({
      title: 'Test Review Hotel',
      description: 'A great place to stay for reviews',
      location: 'Paris',
      price: 150,
      owner: adminUser.user._id,
      images: [{ url: 'http://example.com/image.jpg', publicId: 'img1' }],
    });

    // Create a past, confirmed booking so normalUser is eligible to review
    testBooking = await Booking.create({
      user: normalUser.user._id,
      hotel: testHotel._id,
      checkIn: new Date(Date.now() - 86400000 * 5), // 5 days ago
      checkOut: new Date(Date.now() - 86400000 * 2), // 2 days ago
      guests: 1,
      totalPrice: 450,
      status: 'confirmed'
    });
  });

  describe('GET /api/v1/reviews/:hotelId', () => {
    it('should retrieve reviews for a hotel', async () => {
      // Create a dummy review first
      await Review.create({
        user: normalUser.user._id,
        hotel: testHotel._id,
        booking: testBooking._id,
        rating: 4,
        comment: 'Nice hotel!'
      });

      const res = await request(app).get(`/api/v1/reviews/${testHotel._id}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.reviews)).toBe(true);
      expect(res.body.data.reviews.length).toBe(1);
    });
  });

  describe('GET /api/v1/reviews/:hotelId/eligibility', () => {
    it('should return eligibility true for user with past booking', async () => {
      const res = await request(app)
        .get(`/api/v1/reviews/${testHotel._id}/eligibility`)
        .set('Authorization', `Bearer ${normalUserToken}`);
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.canReview).toBe(true);
    });

    it('should return eligibility false for user without past booking', async () => {
      const res = await request(app)
        .get(`/api/v1/reviews/${testHotel._id}/eligibility`)
        .set('Authorization', `Bearer ${anotherUserToken}`);
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.canReview).toBe(false);
    });
  });

  describe('POST /api/v1/reviews/:hotelId', () => {
    it('should allow user to post review if eligible', async () => {
      const res = await request(app)
        .post(`/api/v1/reviews/${testHotel._id}`)
        .set('Authorization', `Bearer ${normalUserToken}`)
        .send({ rating: 5, comment: 'Amazing stay!', bookingId: testBooking._id.toString() });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.rating).toBe(5);
    });

    it('should reject review if user is not eligible', async () => {
      const res = await request(app)
        .post(`/api/v1/reviews/${testHotel._id}`)
        .set('Authorization', `Bearer ${anotherUserToken}`)
        .send({ rating: 5, comment: 'Nice', bookingId: testBooking._id.toString() });

      expect(res.status).toBe(403);
    });

    it('should require authentication to post review', async () => {
      const res = await request(app)
        .post(`/api/v1/reviews/${testHotel._id}`)
        .send({ rating: 5, comment: 'Great!' });

      expect(res.status).toBe(401);
    });
  });

  describe('PUT /api/v1/reviews/:reviewId', () => {
    let testReview;

    beforeEach(async () => {
      testReview = await Review.create({
        user: normalUser.user._id,
        hotel: testHotel._id,
        booking: testBooking._id,
        rating: 4,
        comment: 'Nice hotel!'
      });
    });

    it('should allow user to update their own review', async () => {
      const res = await request(app)
        .put(`/api/v1/reviews/${testReview._id}`)
        .set('Authorization', `Bearer ${normalUserToken}`)
        .send({ rating: 5, comment: 'Actually, it was amazing!' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.rating).toBe(5);
    });

    it('should deny other users from updating the review', async () => {
      const res = await request(app)
        .put(`/api/v1/reviews/${testReview._id}`)
        .set('Authorization', `Bearer ${anotherUserToken}`)
        .send({ rating: 1, comment: 'Hacked!' });

      expect(res.status).toBe(403);
    });
  });

  describe('DELETE /api/v1/reviews/:reviewId', () => {
    let testReview;

    beforeEach(async () => {
      testReview = await Review.create({
        user: normalUser.user._id,
        hotel: testHotel._id,
        booking: testBooking._id,
        rating: 4,
        comment: 'Nice hotel!'
      });
    });

    it('should allow user to delete their own review', async () => {
      const res = await request(app)
        .delete(`/api/v1/reviews/${testReview._id}`)
        .set('Authorization', `Bearer ${normalUserToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should deny other users from deleting the review', async () => {
      const res = await request(app)
        .delete(`/api/v1/reviews/${testReview._id}`)
        .set('Authorization', `Bearer ${anotherUserToken}`);

      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/v1/reviews/booking/:bookingId', () => {
    it('should return review for a booking if user is authorized', async () => {
      await Review.create({
        user: normalUser.user._id,
        hotel: testHotel._id,
        booking: testBooking._id,
        rating: 4,
        comment: 'Nice hotel!'
      });

      const res = await request(app)
        .get(`/api/v1/reviews/booking/${testBooking._id}`)
        .set('Authorization', `Bearer ${normalUserToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
