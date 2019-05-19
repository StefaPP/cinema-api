import { Schema, model } from 'mongoose';

export const SeatReservedSchema = new Schema({
  seat: {
    type: Schema.Types.ObjectId,
    ref: 'Seat',
  },
  reservation: {
    type: Schema.Types.ObjectId,
    ref: 'Reservation',
  },
  screening: {
    type: Schema.Types.ObjectId,
    ref: 'Screening',
  },
});

export const SeatReserved = model('SeatReserved', SeatReservedSchema);