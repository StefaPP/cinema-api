import { request, login, JWT } from './common';
import { User } from '../models/user';
import { Role } from '../models/role';

describe('# Auth', () => {
  const endpoint = process.env.API_BASE + 'login';

  before(async () => {
    await User.deleteMany({});
    await Role.deleteMany({});
  });

  it('logs in admin', () => {
    return login('admin').then(res => {
      res.status.should.equal(200);
      res.body.token.should.not.be.empty;
    });
  });

  it('registers user and retrieves its token', () => {
    return Role.create({ type: 'member' }).then(role => {
      return request.post(process.env.API_BASE + 'register')
        .send({ email: 'john@doe.com', password: 'password', passwordConfirmation: 'password' })
        .expect(200)
        .then(res => {
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
});
