import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URL);
    if (res) {
      console.log('Database connected!!!');
    }
  } catch (error) {
    console.log('Db connection error:' + error.message);

    process.exit(1);
  }
};

export default dbConnect;
