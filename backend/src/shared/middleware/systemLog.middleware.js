import SystemLog from '../../modules/admin/log.model.js';

const systemLogger = async (req, res, next) => {

  if (req.method === 'GET' || req.method === 'OPTIONS') {
    return next();
  }

  res.on('finish', async () => {
    if (res.statusCode >= 200 && res.statusCode < 400 && req.user) {
      try {
        let action = `${req.method} ${req.originalUrl}`;
        if (req.originalUrl.includes('/register-hotels')) action = 'Created Hotel Request';
        else if (req.originalUrl.includes('/login')) action = 'User Logged In';
        else if (req.originalUrl.includes('/bookings') && req.method === 'POST') action = 'Created Booking';
        else if (req.originalUrl.includes('/approvals')) action = 'Resolved Approval';
        else if (req.originalUrl.includes('/users')) action = 'Managed User';

        await SystemLog.create({
          level: 'INFO',
          action: action,
          user: req.user.id,
          details: {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
          }
        });
      } catch (err) {
        console.error('Failed to log action:', err);
      }
    }
  });

  next();
};

export default systemLogger;
