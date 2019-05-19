import { Schema, model } from 'mongoose';

export const ReservationTypeSchema = new Schema({
  type: {
    type: Schema.Types.String,
    required: 'Enter reservation type'
  }
});

export const ReservationType = model('ReservationType', ReservationTypeSchema);


