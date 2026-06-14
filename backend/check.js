import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ApprovalRequest from './src/modules/admin/approval.model.js';
import Hotel from './src/modules/hotel/hotel.model.js';

dotenv.config();

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const approval = await ApprovalRequest.findById('6a2d16a133fac796f8df20f7');
  console.log('Approval:', approval);
  
  if (approval && approval.hotel) {
    const hotel = await Hotel.findById(approval.hotel);
    console.log('Hotel:', hotel);
  }
  
  process.exit(0);
}

check();
