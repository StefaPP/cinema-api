import { Request, Response } from 'express';
import { Screening } from '../models/screening';

export class ScreeningController {

  public addScreening(req: Request, res: Response) {
    const screening = new Screening(req.body);
    screening.save((err, screening) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(screening);
    });
  }

  public removeScreening(req: Request, res: Response) {
    Screening.deleteOne({ _id: req.body.id }).exec((err, screening) => {
      if (err || !screening.n) {
        res.status(400).send(err);
      }
      res.status(200).send();
    })
  }

  public async updateScreening(req: Request, res: Response) {
    try {
      const screening = await Screening.findById(req.body.id) as any;
      screening.screeningTime = new Date(req.body.screeningTime);
      screening.save();

      res.json(screening);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }

  }
}
