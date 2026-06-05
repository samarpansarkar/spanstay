import { z } from 'zod';

export const createHotelSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string(),
  price: z.number(),
  amenities: z.array(z.string()),
});
