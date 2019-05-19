import { Schema, model } from 'mongoose';

export const ReservationSchema = new Schema({
  screening: {
    type: Schema.Types.ObjectId,
    ref: 'Screening',
  },
  reservedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reservationType: {
    type: Schema.Types.ObjectId,
    ref: 'ReservationType'
  },
  reservationContact: {
    type: Schema.Types.String,
  },
  reserved: {
    type: Schema.Types.Boolean,
    ref: 'ReservationType'
  },
  employeePaid: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  paid: {
    type: Schema.Types.Boolean,
  },
  active: {
    type: Schema.Types.Boolean,
  },
});

export const Reservation = model('Reservation', ReservationSchema);


