import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(3, 'To short for a name!!!'),
  email: z
    .string()
    .min(1, 'to short enter valid email')
    .email('Email is invalid!!!'),

  password: z.string().min(6, 'Password must be at least 6 charecters!!!'),
});
