import * as mongoose from 'mongoose';
import { MovieSchema } from '../models/movie';
import { Request, Response } from 'express';

const Movie = mongoose.model('Movie', MovieSchema);

export class MovieController {
  public addMovie(req: Request, res: Response) {
    let newMovie = new Movie(req.body);
    newMovie.save((err, movie) => {
      if (err) {
        res.send(err);
      }
      res.json(movie);
    });
  }

  public getAllMovies(req: Request, res: Response) {
    Movie.find({}, (err, movies) => {
      if (err) {
        res.send(err);
      }
      res.json(movies);
    });
  }

  public getMovieById(req: Request, res: Response) {
    Movie.findById(req.params.id, (err, movie) => {
      if (err) {
        res.send(err);
      }
      res.json(movie);
    });
  }

}