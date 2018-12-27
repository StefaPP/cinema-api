import { request, login, JWT } from './common';
import { Movie } from '../models/movie';

describe('# Movies', () => {

  let movie;

  it('creates a movie', () => {
    return request.post(process.env.API_BASE + 'movie')
      .set('Authorization', JWT)
      .send({
        title: 'Avengers: Infinity War',
        genres: ['Action', 'Comic', 'Sci-Fi'],
        year: '2018',
        time: 120
      })
      .expect(200);
  });

  it('returns movie list', () => {
    return request.get(process.env.API_BASE + 'movies')
      .set('Authorization', JWT)
      .expect(200)
      .then(res => {
        res.body.length.should.be.eq(1);
        res.body[0].title.should.eq('Avengers: Infinity War');
        movie = res.body[0];
      });
  });

  it('returns specific movie', () => {
    return request.get(process.env.API_BASE + 'movies/' + movie._id)
      .set('Authorization', JWT)
      .expect(200)
      .then(res => {
        res.body.title.should.eq('Avengers: Infinity War');
      });
  });

  after(async () => {
    await Movie.deleteMany({});
  });

});
