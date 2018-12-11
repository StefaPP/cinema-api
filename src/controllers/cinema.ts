import * as mongoose from 'mongoose';
import { CinemaSchema } from '../models/cinema';
import { Request, Response } from 'express';

const Cinema = mongoose.model('Cinema', CinemaSchema);

export class CinemaController {
  public addCinema(req: Request, res: Response) {
    let newCinema = new Cinema(req.body);
    newCinema.save((err, Cinema) => {
      if (err) {
        res.send(err);
      }
      res.json(Cinema);
    });
  }

  public getAllCinemas(req: Request, res: Response) {
    Cinema.find({}, (err, Cinemas) => {
      if (err) {
        res.send(err);
      }
      res.json(Cinemas);
    });
  }

  public getCinemaById(req: Request, res: Response) {
    Cinema.findById(req.params.id, (err, Cinema) => {
      if (err) {
        res.send(err);
      }
      res.json(Cinema);
    });
  }

}