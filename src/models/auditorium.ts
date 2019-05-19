import { Schema, model } from 'mongoose';

export const AuditoriumSchema = new Schema({
  name: {
    type: String,
    required: 'Enter an auditorium name'
  },
  seatsNo: {
    type: Number,
    required: 'Enter number of seats'
  }
});

export const Auditorium = model('Auditorium', AuditoriumSchema);