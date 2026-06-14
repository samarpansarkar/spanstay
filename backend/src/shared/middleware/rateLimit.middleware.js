import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 100,
  message: {
    success: false,
    message: 'Too many request , try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
