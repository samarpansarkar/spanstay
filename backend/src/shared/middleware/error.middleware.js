const errorHandler = (err, req, res, next) => {
  console.log('Global Error: ', err.message);

  let statusCode = err.statusCode || 500;

  let message = err.message || 'Internal server error.';

  // MONGOOSE VALIDATION ERROR
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // DUPLICATE KEY ERROR
  if (err.code === 11000) {
    statusCode = 400;

    const field = Object.keys(err.keyValue)[0];

    message = `${field} already exists`;
  }

  // INVALID OBJECT ID
  if (err.name === 'CastError') {
    statusCode = 400;

    message = 'Invalid resource ID';
  }

  // JWT EXPIRED
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;

    message = 'Token expired';
  }

  console.log('ERROR:', err);

  res.status(statusCode).json({
    success: false,

    message,

    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
    }),
  });
};

export default errorHandler;
