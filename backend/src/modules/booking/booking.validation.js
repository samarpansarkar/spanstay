import { z } from 'zod';
import { objectIdSchema } from '../../shared/validators/objectId.validator.js';

export const createBookingSchema = z.object({
  body: z.object({
    hotelId: objectIdSchema,

    checkIn: z.string().datetime('Invalid checkIn date'),

    checkOut: z.string().datetime('Invalid checkOut date'),

    guests: z.coerce
      .number()
      .min(1, 'At least 1 guest required')
      .max(10, 'Maximum 10 guests allowed'),
  }),
});

export const bookingParamSchema = z.object({
  params: z.object({
    bookingId: objectIdSchema,
  }),
});
