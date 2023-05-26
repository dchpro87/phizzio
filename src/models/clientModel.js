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
    address1: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    note: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A Client must belong to a User'],
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
