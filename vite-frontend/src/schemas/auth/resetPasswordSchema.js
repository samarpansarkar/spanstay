import { z } from 'zod';

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password cannot exceed 20 characters'),
});
