import { Request, Response } from 'express';
import { MovieController } from '../controllers/movie';
import { CinemaController } from '../controllers/cinema';

export class Routes {
  public movieController: MovieController = new MovieController();
  public cinemaController: CinemaController = new CinemaController();

  public routes(app): void {

    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successful',
        });
      })

    app.route('/movie').post(this.movieController.addMovie)
    app.route('/movies').get(this.movieController.getAllMovies);
    app.route('/movies/:id').get(this.movieController.getMovieById);

    app.route('/cinema').post(this.cinemaController.addCinema)
    app.route('/cinemas').get(this.cinemaController.getAllCinemas);
    app.route('/cinemas/:id').get(this.cinemaController.getCinemaById);

  }
}