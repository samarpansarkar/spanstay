import express from 'express';
import routes from './routes/index.js';
import errorHandler from './shared/middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import AppError from './shared/utils/AppError.js';
const app = express();

app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //form data--file uploads--multipart handling later

app.use('/api/v1', routes);
app.get('/favicon.ico', (req, res) =>
  res.status(204).end()
);
app.use((req, res, next) => {
  next(new AppError(`Cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export default app;
