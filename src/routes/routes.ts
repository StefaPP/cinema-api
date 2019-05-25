import { Request, Response } from 'express';
import { MovieController } from '../controllers/movie';
import { CinemaController } from '../controllers/cinema';
import { AuthController } from '../controllers/auth';
import { ReservationController } from '../controllers/reservation';
import { ScreeningController } from '../controllers/screening';
import { AuditoriumController } from '../controllers/auditorium';

export class Routes {
  public movieController: MovieController = new MovieController();
  public cinemaController: CinemaController = new CinemaController();
  public authController: AuthController = new AuthController();
  public reservationController: ReservationController = new ReservationController;
  public screeningController: ScreeningController = new ScreeningController;
  public auditoriumController: AuditoriumController = new AuditoriumController;
  public routes(app): void {

    const endpoint = process.env.API_BASE;

    /**
    * @api {post} /api/v1/login Generate a token
    * @apiVersion 1.0.0
    * @apiName Login
    * @apiGroup Auth
    * @apiPermission public
    * @apiDescription In order to generate a token, you will need to already have a user in the database.
    *
    * @apiParam (Request body) {String} email The email
    * @apiParam (Request body) {String} password The password
    *
    * @apiExample {js} Example usage:
    * const data = {
    *   "email": "test@email.com",
    *   "password": "yourpassword"
    * };
    *
    * $http.post(url, data)
    *   .success((res) => doSomethingHere())
    *   .error((err) => doSomethingHere());
    *
    * @apiSuccess {String} token The token that must be used to access the other endpoints
    * @apiSuccess {String} expires The expiration datetime (YYYY-MM-DDTHH:mm:ssZ)
    * @apiSuccess {String} user The user id
    *
    * @apiSuccessExample {json} Success response:
     *     HTTPS 200 OK
     *     {
     *      "token": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ... and the rest of the token here",
     *      "expires": "2017-10-28T14:50:17+00:00",
     *      "user": "57e12cab65c0c892381b8b44"
     *    }
    */
    app.post(endpoint + 'login', this.authController.login);
    app.post(endpoint + 'register', this.authController.register);

    app.route(endpoint + 'movie').post(this.movieController.addMovie);
    app.route(endpoint + 'movies').get(this.movieController.getAllMovies);
    app.route(endpoint + 'movies/:id').get(this.movieController.getMovieById);

    app.route(endpoint + 'cinema').post(this.cinemaController.addCinema);
    app.route(endpoint + 'cinemas').get(this.cinemaController.getAllCinemas);
    app.route(endpoint + 'cinemas/:id').get(this.cinemaController.getCinemaById);

    app.route(endpoint + 'screening').post(this.screeningController.addScreening)
    app.route(endpoint + 'screening').delete(this.screeningController.removeScreening)
    app.route(endpoint + 'screening').put(this.screeningController.updateScreening)

    app.route(endpoint + 'auditorium').post(this.auditoriumController.addAuditorium)
    app.route(endpoint + 'auditorium/:id/screenings').get(this.auditoriumController.getAuditoriumScreenings)

    app.route(endpoint + 'reserve').post(this.reservationController.makeReservation);

    app.route(endpoint + 'populate').post(this.movieController.populateMovies);

    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successful',
        });
      });

  }
}