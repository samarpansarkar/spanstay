import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import routes from './routes/index.js';
import errorHandler from './shared/middleware/error.middleware.js';
import AppError from './shared/utils/AppError.js';
import path from 'path';

const app = express();

app.use(morgan('dev'));
app.use(
  cors({
    origin: [process.env.CLIENT_URL, 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(
  express.json({
    verify: (req, res, buf) => {
      if (req.originalUrl.startsWith('/api/v1/payments/webhook')) {
        req.rawBody = buf;
      }
    },
  })
);
app.use(express.urlencoded({ extended: true }));

import systemLogger from './shared/middleware/systemLog.middleware.js';

app.use('/api/v1', systemLogger, routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/tests/results', express.static(path.resolve('tests/results')));
app.use('/tests/coverage', express.static(path.resolve('coverage/lcov-report')));
app.get('/', (req, res) => res.status(200).json({ status: 'success', message: 'API is running' }));
app.head('/', (req, res) => res.status(200).end());
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use((req, res, next) => {
  next(new AppError(`Cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export default app;
