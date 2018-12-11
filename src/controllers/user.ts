import * as mongoose from 'mongoose';
import { User } from '../models/user';

export class UserController {
  public createUser = async (req, res) => {
    try {
      this.validateRequest(req);

      let user = new User(req.body);
      await user.save();

      res.status(201).json({ 'message': 'User saved successfully!', 'id': user._id });
    } catch (err) {
      res.status(400).json({ 'message': 'Missing parameters', errors: err });
    }
  }

  private validateRequest = (req, update = false) => {
    if (!update) {
      req.checkBody('email', 'The email cannot be empty').notEmpty();
      req.checkBody('password', 'The password cannot be empty').notEmpty();

      let errors = req.validationErrors();
      if (errors) throw errors;
    }

    if (Object.keys(req.body).length === 0) {
      throw 'Nothing was sent';
    }
  }
}