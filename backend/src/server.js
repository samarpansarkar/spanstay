import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import dbConnect from './config/db.js';
import app from './app.js';
import errorHandler from './shared/middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const PORT = process.env.PORT || 4001;

dbConnect();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(errorHandler);

const server = async () => {
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Your server is running on ${PORT}`);
  });
};

server();
