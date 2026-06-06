import express from 'express';
import './config/env.js';
import dbConnect from './config/db.js';
import app from './app.js';

const PORT = process.env.PORT;

const server = async () => {
  try {
    await dbConnect();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.log('Server startup failed:', error.message);

    process.exit(1);
  }
};

server();
