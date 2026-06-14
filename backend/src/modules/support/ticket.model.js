import mongoose, { Schema } from 'mongoose';

const supportTicketSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['OPEN', 'RESOLVED'],
      default: 'OPEN',
    },
    adminResponse: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);

export default SupportTicket;
