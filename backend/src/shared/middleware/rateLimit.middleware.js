import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: process.env.NODE_ENV === 'test' ? 5000 : 100,
  message: {
    success: false,
    message: 'Too many request , try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
