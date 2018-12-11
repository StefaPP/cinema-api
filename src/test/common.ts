process.env.NODE_ENV = 'test';

import 'mocha';
import { IUser, User } from '../models/user';
import App from '../app';

export const request = require('supertest')(App);

export const chai = require('chai');
export const should = chai.should();

const testUser = { 'email': 'testuser', 'password': 'mytestpass' };

const createUser = async (): Promise<void> => {
  const UserModel = new User(testUser);
  await UserModel.save();
};

const getUser = async (): Promise<IUser> => {
  let users = await User.find({});
  if (users.length === 0) {
    await createUser();
    return getUser();
  } else {
    return users[0];
  }
};

export const login = async (): Promise<any> => {
  let user = await getUser();
  return request.post(process.env.API_BASE + 'login')
    .send({ 'email': user.email, 'password': testUser.password })
    .expect(200);
};