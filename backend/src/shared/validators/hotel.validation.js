import { z } from 'zod';
import { objectIdSchema } from './objectId.validator.js';


export const hotelParamSchema =
  z.object({
    params: z.object({
      hotelId:
        objectIdSchema,
    }),
  });