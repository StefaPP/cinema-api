import { request, login } from './common';
import { User } from '../models/user';

describe('# Auth', () => {
  const endpoint = process.env.API_BASE + 'login';

  it('deletes all users', async () => {
    await User.deleteMany({});
  });

    it('retrieves the token', () => {
    return User.find({}).then(res => {
      return login().then(res => {
        res.status.should.equal(200);
        res.body.token.should.not.be.empty;
      });
    });
  });

  it('doesn\'t login with the right user but wrong password', () => {
    return request.post(endpoint)
      .send({ 'email': 'testuser', 'password': 'anythingGoesHere' })
      .expect(401);
  });

  it('returns invalid credentials error', () => {
    return request.post(endpoint)
      .send({ 'email': 'testuser', 'password': '' })
      .expect(401)
      .then(res => {
        return request.post(endpoint)
          .send({ 'email': 'anotheremail', 'password': 'mypass' })
          .expect(401);
      });
  });

  it('creates a movie', () => {
    return request.post(process.env.API_BASE + 'movie')
      .set('Authorization', 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDYxODYxNzIsImVtYWlsIjoidGVzdHVzZXIifQ.-ffo53YhysCQZhY7smKwbsUmC2e1L5f0gKkv7qYNUJ4')
      .send({
        title: 'New movie',
        year: '2018',
        time: 120
      })
      .expect(200);
  });
});
