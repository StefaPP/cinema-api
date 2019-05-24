import { Movie, MovieSchema } from '../models/movie';
import { Request, Response } from 'express';
var request = require('superagent');

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
        res.status(400).send(err);
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

  public async populateMovies(req: Request, res: Response) {
    const agent = request.agent();
    const host = 'https://api.themoviedb.org';
    try {
      const result = await agent
        .get(`${host}/3/movie/now_playing?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&page=1`);
      
      const movies = result.body.results.map(r => ({
        title: r.title,
        description: r.overview,
        releaseDate: r.release_date,
        poster: `https://image.tmdb.org/t/p/w500/${r.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/w500/${r.backdrop_path}`,
      }));

      await Movie.insertMany(movies);
      res.status(200);
    } catch (err) {
      console.log(err);
    }

  }

}