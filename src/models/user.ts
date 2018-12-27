import * as bcrypt from 'bcryptjs';
import { Schema, Model, model } from 'mongoose';

import { IUserDocument } from '../interfaces/IUserDocument';
export interface IUser extends IUserDocument {
  comparePassword(password: string): boolean;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): any;
}

export const schema: Schema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: [{
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

schema.method('comparePassword', function (password: string): boolean {
  if (bcrypt.compareSync(password, this.password)) return true;
  return false;
});

schema.static('cleanCollection', (): void => {
  this.remove({}).exec();
});

schema.static('hashPassword', (password: string): string => {
  return bcrypt.hashSync(password);
});

schema.static('update', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

export const User: IUserModel = model<IUser, IUserModel>('User', schema);

export default User;
