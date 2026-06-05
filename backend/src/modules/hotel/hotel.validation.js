import { z } from 'zod';

export const createHotelSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string(),
  price: z.number(),
  amenities: z.array(z.string()),
});

export const updateHotelSchema =
  z.object({
    title: z.string().min(3).optional(),

    description: z
      .string()
      .min(10)
      .optional(),

    location: z.string().optional(),

    pricePerNight: z
      .number()
      .optional(),

    amenities: z
      .array(z.string())
      .optional(),

    images: z
      .array(z.string())
      .optional(),
  });