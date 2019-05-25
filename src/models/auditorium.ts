import { Schema, model } from 'mongoose';

export const AuditoriumSchema = new Schema({
  name: {
    type: String,
    required: 'Enter an auditorium name'
  },
  seatsNo: {
    type: Number,
    required: 'Enter number of seats'
  },
  screenings: [{ type: Schema.Types.ObjectId, ref: 'Screening' }]
});

export const Auditorium = model('Auditorium', AuditoriumSchema);