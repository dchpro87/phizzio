import mongoose from 'mongoose';
import Client from './clientModel.js';

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'An Appointment must belong to a User'],
    },
    clientId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
      required: [true, 'An Appointment must belong to a Client'],
    },
    dateTime: {
      type: Date,
      required: [true, 'An Appointment must have a date and time'],
    },
    treatmentType: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    charge: {
      type: Number,
      default: 0,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    causality: {
      type: String,
    },
    treatmentNote: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// populate the clientId field witht the active field from the Client model
appointmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'clientId',
    select: 'active',
  });
  next();
});

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model('Appointment', appointmentSchema);

export default Appointment;
