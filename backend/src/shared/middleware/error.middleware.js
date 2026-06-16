const errorHandler = (err, req, res, next) => {
  console.log('Global Error: ', err.message);

  let statusCode = err.statusCode || 500;

  let message = err.message || 'Internal server error.';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  if (err.name === 'ZodError') {
    statusCode = 400;
    try {
      const parsedErrors = JSON.parse(err.message);
      message = parsedErrors.map(e => e.message).join(', ');
    } catch(e) {
      message = err.message;
    }
  }

  if (err.code === 11000) {
    statusCode = 400;

    const field = Object.keys(err.keyValue)[0];

    message = `${field} already exists`;
  }

  if (err.name === 'CastError') {
    statusCode = 400;

    message = 'Invalid resource ID';
  }

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
