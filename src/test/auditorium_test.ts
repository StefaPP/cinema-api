import { request, JWT } from './common';
import { Auditorium } from '../models/auditorium';
import { Movie } from '../models/movie';
import { Screening } from '../models/screening';

describe('# Auditorium', () => {

  let auditorium;
  let movie;
  let screening;

  it('creates auditorium', () => {
    return request.post(process.env.API_BASE + 'auditorium')
      .set('Authorization', JWT)
      .send({ name: '1', seatsNo: 80 })
      .expect(200)
      .then(res => {
        auditorium = res.body;
        auditorium.should.have.property('_id');
        auditorium.seatsNo.should.eq(80);
      })
  });

  describe('# Auditorium screenigns', () => {

    before(async () => {
      movie = await Movie.create({ title: 'Avengers: Infinity War', releaseDate: '2018', time: 120 });
      screening = await Screening.create({ movie, auditorium, screeningTime: new Date() });
      auditorium = await Auditorium.findById(auditorium._id) as any;

      auditorium.screenings.push(screening);
      auditorium.save();
    })

    it('lists screenings in auditorium', async () => {
      return request.get(process.env.API_BASE + `auditorium/${auditorium._id}/screenings`)
        .set('Authorization', JWT)
        .expect(200)
        .then((res) => {
          res.body.screenings.length.should.eq(1);
        });
    })
  })

  after(async () => {
    await Auditorium.deleteMany({});
    await Movie.deleteMany({});
  });

});
