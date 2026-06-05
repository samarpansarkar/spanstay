import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import dbConnect from './config/db.js';
import app from './app.js';

const PORT = process.env.PORT || 4001;

const server = async () => {
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Your server is running on ${PORT}`);
  });
};

server();
