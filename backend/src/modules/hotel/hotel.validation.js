import { z } from 'zod';

export const createHotelSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    location: z.string(),
    price: z.coerce.number(),
    amenities: z.array(z.string()).optional().or(z.string()),
  }),
});

export const updateHotelSchema = z.object({
  body: z
    .object({
      title: z.string().min(3).optional(),
      description: z.string().min(10).optional(),
      location: z.string().optional(),
      price: z.coerce.number().optional(),
      amenities: z.array(z.string()).optional().or(z.string().optional()),
      images: z.array(z.string()).optional(),
      isAvailable: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});
