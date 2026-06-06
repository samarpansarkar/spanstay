import mongoose from 'mongoose';
import { z } from 'zod';

export const objectIdSchema = z
  .string()
  .refine((id) => mongoose.types.ObjectId.isValid(id), {
    message: 'Invalid MongoDB ID',
  });
