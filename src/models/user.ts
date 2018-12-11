import * as bcrypt from 'bcryptjs';
import { Schema, Model, model } from 'mongoose';

import { IUserDocument } from '../interfaces/IUserDocument';

export interface IUser extends IUserDocument {
  comparePassword(password: string): boolean;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): boolean;
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
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

schema.method('comparePassword', function (password: string): boolean {
  if (bcrypt.compareSync(password, this.password)) return true;
  return false;
});

schema.static('cleanCollection', (): void => {
  this.remove({}).exec();
});

schema.static('save', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

schema.static('update', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

export const User: IUserModel = model<IUser, IUserModel>('User', schema);

export default User;

////////////////////////////////

// export interface IUser implements mongoose.Document {
//     name: string;
//     email: string;
//     password: string;
//     comparePassword(candidatePassword: string): Promise<boolean>;
// }

// export const schema = new mongoose.Schema({
//   name: String,
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


// schema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
//   let password = this.password;
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(candidatePassword, password, (err, success) => {
//       if (err) return reject(err);
//       return resolve(success);
//     });
//   });
// };

// export const model = mongoose.model<IUser>('User', schema);

// export const cleanCollection = () => model.remove({}).exec();

// export default model;