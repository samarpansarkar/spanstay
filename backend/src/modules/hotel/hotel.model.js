import mongoose, { Schema } from 'mongoose';

const hotelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    images: [
      {
        type: String,
      },
    ],
    amenities: [String],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
