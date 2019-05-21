import * as jwt from 'jwt-simple';
import * as passport from 'passport';
import * as moment from 'moment';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IUserDocument as IUser } from '../interfaces/IUserDocument';
import { User } from '../models/user';
import { Role } from '../models/role';

export class AuthController {

  public initialize = () => {
    passport.use('jwt', this.getStrategy());
    return passport.initialize();
  }

  public authenticate = (callback) => passport.authenticate('jwt', { session: false, failWithError: true }, callback);

  private genToken = (user: IUser): Object => {
    let expires = moment().utc().add({ days: 365 }).unix();
    let token = jwt.encode({
      exp: expires,
      email: user.email
    }, process.env.JWT_SECRET);

    return {
      token: 'JWT ' + token,
      expires: moment.unix(expires).format(),
      user: user._id
    };
  }

  public login = async (req, res) => {
    try {
      req.checkBody('email', 'Invalid email').notEmpty();
      req.checkBody('password', 'Invalid password').notEmpty();

      let errors = req.validationErrors();
      if (errors) throw errors;

      let user = await User.findOne({ 'email': req.body.email }).exec();
      if (user === null) throw 'User not found';

      let success = await user.comparePassword(req.body.password);
      if (success === false) throw '';

      res.status(200).json(this.genToken(user));
    } catch (err) {
      res.status(401).json({ 'message': 'Invalid credentials', 'errors': err });
    }
  }

  public register = async (req, res) => {
    try {
      console.log('AAAAAAAAAAAAAA');
      req.checkBody('email', 'Invalid email').notEmpty();
      req.checkBody('password', 'Invalid password').notEmpty();
      req.checkBody('passwordConfirmation', 'Passwords do not match').notEmpty();

      let errors = req.validationErrors();
      if (errors) throw errors;

      let user = await User.findOne({ 'email': req.body.email }).exec();
      if (user) {
        throw ('User with this email already exists');
      }

      user = new User({ email: req.body.email });
      user.password = User.hashPassword(req.body.password);
      user.role = await Role.findOne({ type: 'member ' });
      await user.save();

      res.status(200).json(this.genToken(user));
    } catch (err) {
      throw err;
    }
  }

  public isAdmin = async (req, res, next) => {
    try {
      if (req.user.role.type === 'admin') {
        next();
      }
    } catch (err) {
      res.status(403).json({ 'message': 'Invalid permission', 'errors': err });
    }
  }


  private getStrategy = (): Strategy => {
    const params = {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      passReqToCallback: true
    };

    return new Strategy(params, (req, payload: any, done) => {
      User.findOne({ 'email': payload.email }).populate('role', 'type').exec((err, user) => {
        /* istanbul ignore next: passport response */
        if (err) {
          return done(err);
        }
        /* istanbul ignore next: passport response */
        if (user === null) {
          return done(null, false, { message: 'The user in the token was not found' });
        }

        return done(null, { _id: user._id, email: user.email, role: user.role[0] });
      });
    });
  }
}