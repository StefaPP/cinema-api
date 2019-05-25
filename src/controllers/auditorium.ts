import { Request, Response } from 'express';
import { Auditorium } from '../models/auditorium';

export class AuditoriumController {

  public async addAuditorium(req: Request, res: Response) {
    try {
      const auditorium = await Auditorium.create(req.body);

      res.json(auditorium);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  public async getAuditoriumScreenings(req: Request, res: Response) {
    try {
      const screening = await Auditorium.findById(req.params.id).populate('screenings');

      res.json(screening);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}