import { Reservation } from '../models/reservation';
import { Request, Response } from 'express';
import { SeatReserved } from '../models/seat_reserved';

export class ReservationController {

  public makeReservation(req: Request, res: Response) {
    const reservation = new Reservation(req.body);
    reservation.save((err, reservation) => {
      if (err) {
        res.send(err);
      }

      const seatReserved = new SeatReserved({ seat: req.body.seat, reservation, screening: req.body.screening });
      seatReserved.save((err, seatReserved) => {
        if (err) {
          res.send(err);
        }
        res.json(reservation);
      });
    });
  }
}