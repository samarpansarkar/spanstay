import { z } from 'zod';
import mongoose from 'mongoose';

export const paginationSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : 1))
      .refine((val) => val > 0, { message: 'Page must be greater than 0' }),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : 10))
      .refine((val) => val > 0 && val <= 100, {
        message: 'Limit must be between 1 and 100',
      }),
  }),
});

export const notificationIdParamSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid notification ID format',
    }),
  }),
});
