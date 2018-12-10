import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CinemaSchema = new Schema({
  name: {
    type: String,
    required: 'Enter a cinema name'
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  founded: {
    type: Date
  }
});