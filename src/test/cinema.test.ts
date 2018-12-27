import { request, JWT } from './common';
import { Cinema } from '../models/cinema';

describe('# Cinema', () => {

  let cinema;

  it('creates a cinema', () => {
    return request.post(process.env.API_BASE + 'cinema')
      .set('Authorization', JWT)
      .send({
        name: 'CinCity',
        country: 'Serbia',
        city: 'Novi Sad',
        founded: new Date('01.01.2018'),
      })
      .expect(200);
  });

  it('lists cinemas', () => {
    return request.get(process.env.API_BASE + 'cinemas')
      .set('Authorization', JWT)
      .expect(200)
      .then(res => {
        res.body.length.should.eq(1);
        cinema = res.body[0];
      });
  });

  it('returns cinema by id', () => {
    return request.get(process.env.API_BASE + 'cinemas/' + cinema._id)
      .set('Authorization', JWT)
      .expect(200)
      .then(res => {
        res.body.name.should.eq('CinCity');
      });
  });

  after(async () => {
    await Cinema.deleteMany({});
  });

});
