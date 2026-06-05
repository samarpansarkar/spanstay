import { Router } from 'express';
import authRouter from '../modules/auth/auth.routes.js';
import hotelRouter from '../modules/hotel/hotel.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'StayFinder API Running',
  });
});

router.use('/auth', authRouter);
router.use('/hotels',hotelRouter);

export default router;
