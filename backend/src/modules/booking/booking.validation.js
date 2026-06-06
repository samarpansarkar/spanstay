import { z } from 'zod';

export const createBookingSchema = z.object({
  hotelId: z.string(),

  checkIn: z.string(),

  checkOut: z.string(),

  guests: z.number().min(1),
});
