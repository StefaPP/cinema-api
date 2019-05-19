import { Movie } from '../models/movie';
import { Request, Response } from 'express';

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
    Movie.find({}).limit(10).exec((err, movies) => {
      if (err) {
        res.send(err);
      }
      res.send({ body: movies });
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