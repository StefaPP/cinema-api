import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MovieSchema = new Schema({
  title: {
    type: String,
    required: 'Enter a first name'
  },
  year: {
    type: String,
    required: 'Enter a last name'
  },
  genres: {
    type: Array,
  },
  time: {
    type: Number,
    required: 'Enter length',
  },
  lang: {
    type: String
  },
  country: {
    type: Number
  },
  cinemas: [{
    type: Schema.Types.ObjectId,
    ref: 'Cinema'
  }]
});

export const Movie = mongoose.model('Movie', MovieSchema);