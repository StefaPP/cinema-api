import { request, login, JWT } from './common';
import { Movie } from '../models/movie';
import User from '../models/user';

describe('# Movies', () => {

  let movie;

  it('creates a movie', () => request.post(process.env.API_BASE + 'movie')
    .set('Authorization', JWT)
    .send({
      title: 'Avengers: Infinity War',
      genres: ['Action', 'Comic', 'Sci-Fi'],
      releaseDate: '2018',
      time: 120
    })
    .expect(200)
  )

  it('returns movie list', () => request.get(process.env.API_BASE + 'movies')
    .set('Authorization', JWT)
    .expect(200)
    .then(res => {
      res.body.length.should.be.eq(1);
      res.body[0].title.should.eq('Avengers: Infinity War');
      movie = res.body[0];
    }))

  it('returns specific movie', () => request.get(process.env.API_BASE + 'movies/' + movie._id)
    .set('Authorization', JWT)
    .expect(200)
    .then(res => {
      res.body.title.should.eq('Avengers: Infinity War');
    }));

  it('fails to create movie as member', async () => {
    const res = await login('member');
    request.post(process.env.API_BASE + 'movie')
      .set('Authorization', res.body.token)
      .send({
        title: 'Movie 1',
        year: '2018',
        time: 123,
      })
      .expect(403);
  });

  after(async () => {
    await Movie.deleteMany({});
  });

});
