import { request, JWT } from './common';
import { Auditorium } from '../models/auditorium';
import { Movie } from '../models/movie';
import { Screening } from '../models/screening';

describe('# Screening', () => {

  let auditorium;
  let movie;
  let screening;

  before(async () => {
    auditorium = await Auditorium.create({ name: '5', seatsNo: 30 });
    movie = await Movie.create({ title: 'Avengers: Infinity War', releaseDate: '2018', time: 120 });
  });

  it('creates screening for a movie', () => {
    return request.post(process.env.API_BASE + 'screening')
      .set('Authorization', JWT)
      .send({
        auditorium: auditorium._id,
        movie: movie._id,
        screeningTime: new Date(),
      })
      .expect(200)
      .then(res => {
        screening = res.body;
        screening.should.have.property('_id');
      })
  });

  it('changes time of screening', () => {
    return request.put(process.env.API_BASE + 'screening')
      .set('Authorization', JWT)
      .send({
        id: screening._id,
        screeningTime: new Date('05-27-2019 20:00'),
      })
      .expect(200)
      .then((res) => {
        res.body.screeningTime.should.eq('2019-05-27T18:00:00.000Z');
      })
  })

  it('removes screening for a movie', () => {
    return request.delete(process.env.API_BASE + 'screening')
      .set('Authorization', JWT)
      .send({ id: screening._id })
      .expect(200)
  });

  it('fails to remove screening (missing screening)', () => {
    return request.delete(process.env.API_BASE + 'screening')
      .set('Authorization', JWT)
      .send({ id: screening._id })
      .expect(400)
  });

  after(async () => {
    await Auditorium.deleteMany({});
    await Movie.deleteMany({});
    await Screening.deleteMany({});
  });

});
