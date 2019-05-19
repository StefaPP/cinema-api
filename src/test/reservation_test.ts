import { request, JWT } from './common';
import { Auditorium } from '../models/auditorium';
import { Seat } from '../models/seat';
import { Movie } from '../models/movie';
import { Screening } from '../models/screening';
import { ReservationType } from '../models/reservation_type';
import { Reservation } from '../models/reservation';

describe('# Cinema', () => {

  let auditorium;
  let movie;
  let screening;
  let seat;

  before(async () => {

    auditorium = await Auditorium.create({ name: '5', seatsNo: 30 });
    const seats = [...Array(10).keys()].map((i) => ({
      row: 1,
      number: i + 1,
      auditorium: auditorium.id,
    }));
    seat = (await Seat.create(seats));
    movie = await Movie.create({ title: 'Avengers: Infinity War', year: '2018', time: 120 });
    screening = await Screening.create({ movie, auditorium, screeningTime: new Date() });

  });

  it('makes a reservation', () => {
    return ReservationType.create({ type: 'online' }).then(resType => {
      return request.post(process.env.API_BASE + 'reserve')
        .set('Authorization', JWT)
        .send({
          seat: seat[1],
          screening: screening._id,
          reservationType: resType._id,
          reserved: true,
          paid: false,
        })
        .expect(200)
        .then(res => {
          res.body.should.have.property('_id');
        });
    });
  });

  after(async () => {
    await Auditorium.deleteMany({});
    await Movie.deleteMany({});
    await Seat.deleteMany({});
    await ReservationType.deleteMany({});
    await Reservation.deleteMany({});
  });

});
