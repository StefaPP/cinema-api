import { Schema, model } from 'mongoose';

export const SeatSchema = new Schema({
  row: {
    type: Number,
    required: 'Enter row number'
  },
  number: {
    type: Number,
    required: 'Enter seat number'
  },
  auditorium: {
    type: Schema.Types.ObjectId,
    ref: 'Auditorium'
  }
});

export const Seat = model('Seat', SeatSchema);