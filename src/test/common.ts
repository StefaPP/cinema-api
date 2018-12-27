process.env.NODE_ENV = 'test';

import 'mocha';
import { IUser, User } from '../models/user';
import App from '../app';
import { Role } from '../models/role';

export const request = require('supertest')(App);

export const chai = require('chai');
export const should = chai.should();

const testUser = { 'email': 'testuser', 'password': 'mytestpass' };
const testRole = { 'type': 'admin' };

const createUser = async (): Promise<void> => {
  const UserModel = new User(testUser);
  UserModel.role = await getRole();
  UserModel.password = User.hashPassword(testUser.password);
  await UserModel.save();
};

const createRole = async (): Promise<void> => {
  const adminRole = new Role(testRole);
  await adminRole.save();
};

const getRole = async (): Promise<any> => {
  const role = await Role.findOne(testRole);
  if (role) {
    return role;
  } else {
    await createRole();
    return getRole();
  }
};

const getUser = async (): Promise<IUser> => {
  let users = await User.find({}).populate('role', 'type');
  if (users.length === 0) {
    await createUser();
    return getUser();
  } else {
    return users[0];
  }
};

export const JWT = 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDYxODYxNzIsImVtYWlsIjoidGVzdHVzZXIifQ.-ffo53YhysCQZhY7smKwbsUmC2e1L5f0gKkv7qYNUJ4';

export const login = async (): Promise<any> => {
  let user = await getUser();
  return request.post(process.env.API_BASE + 'login')
    .send({ 'email': user.email, 'password': testUser.password })
    .expect(200);
};