import { Schema, model } from 'mongoose';

export const ScreeningSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  },
  auditorium: {
    type: Schema.Types.ObjectId,
    ref: 'Auditorium',
  },
  screeningTime: {
    type: Schema.Types.Date,
    required: 'Enter screening time',
  }
});

export const Screening = model('Screening', ScreeningSchema);