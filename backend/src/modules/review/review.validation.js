import { z } from 'zod';

export const createReviewValidationSchema = z.object({
  body: z.object({
    rating: z
      .number()
      .min(1, { message: 'Rating must be at least 1' })
      .max(5, { message: 'Rating cannot be more than 5' }),
    comment: z
      .string()
      .min(3, { message: 'Comment must be at least 3 characters long' })
      .max(500, { message: 'Comment cannot exceed 500 characters' }),
  }),
});

export const updateReviewValidationSchema = z.object({
  body: z.object({
    rating: z
      .number()
      .min(1, { message: 'Rating must be at least 1' })
      .max(5, { message: 'Rating cannot be more than 5' })
      .optional(),
    comment: z
      .string()
      .min(3, { message: 'Comment must be at least 3 characters long' })
      .max(500, { message: 'Comment cannot exceed 500 characters' })
      .optional(),
  }).refine(data => data.rating !== undefined || data.comment !== undefined, {
    message: 'At least one field (rating or comment) must be provided for update',
  }),
});
