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

const createUser = async (type: string): Promise<void> => {
  const UserModel = new User(testUser);
  UserModel.role = await getRole(type);
  UserModel.password = User.hashPassword(testUser.password);
  await UserModel.save();
};

const createRole = async (type: string): Promise<void> => {
  const role = new Role({ type });
  await role.save();
};

const getRole = async (type: string): Promise<any> => {
  const role = await Role.findOne({ type });
  if (role) {
    return role;
  } else {
    await createRole(type);
    return getRole(type);
  }
};

const getUser = async (type): Promise<IUser> => {
  let users = await User.find({}).populate('role', 'type');
  if (users.length === 0) {
    await createUser(type);
    return getUser(type);
  } else {
    return users[0];
  }
};

export const JWT = 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDYxODYxNzIsImVtYWlsIjoidGVzdHVzZXIifQ.-ffo53YhysCQZhY7smKwbsUmC2e1L5f0gKkv7qYNUJ4';

export const login = async (type): Promise<any> => {
  let user = await getUser(type);
  return request.post(process.env.API_BASE + 'login')
    .send({ 'email': user.email, 'password': testUser.password })
    .expect(200);
};