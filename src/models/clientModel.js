import mongoose from 'mongoose';
import validator from 'validator';

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A User must have a name'],
    },
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide valid email'],
    },
    cellphone: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);

export default Client;