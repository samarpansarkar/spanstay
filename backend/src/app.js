import express from 'express';
import routes from './routes/index.js';
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', routes);

export default app;
