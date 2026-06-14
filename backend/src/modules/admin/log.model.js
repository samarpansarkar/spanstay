import mongoose, { Schema } from 'mongoose';

const systemLogSchema = new Schema(
  {
    level: {
      type: String,
      enum: ['INFO', 'WARN', 'ERROR'],
      default: 'INFO',
    },
    action: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    details: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const SystemLog = mongoose.model('SystemLog', systemLogSchema);

export default SystemLog;
