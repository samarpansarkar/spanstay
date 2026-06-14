import { z } from 'zod';

export const verifyEmailSchema = z.object({
  otp: z.string().length(6, 'Verification code must be exactly 6 digits'),
});
