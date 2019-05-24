import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MovieSchema = new Schema({
  title: {
    type: String,
    required: 'Enter title'
  },
  releaseDate: {
    type: String,
    required: 'Enter year'
  },
  genres: {
    type: Array,
  },
  time: {
    type: Number,
  },
  lang: {
    type: String
  },
  country: {
    type: Number
  },
  poster: {
    type: String,
  },
  backdrop: {
    type: String,
  },
  cinemas: [{
    type: Schema.Types.ObjectId,
    ref: 'Cinema'
  }]
});

export const Movie = mongoose.model('Movie', MovieSchema);