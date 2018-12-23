require('dotenv/config');
const expressValidator = require('express-validator');
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/routes';
import * as mongoose from 'mongoose';
import { AuthController } from './controllers/auth';

class App {

  public app: express.Application;
  public routePrv: Routes = new Routes();
  public mongoUrl: string = 'mongodb://127.0.0.1:27017/cincity';
  public auth: AuthController = new AuthController();

  constructor() {
    this.app = express();
    this.app.use(expressValidator());
    this.config();
    this.routePrv.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(this.auth.initialize());
    this.authenticate();
  }

  private authenticate(): any {
    this.app.all(process.env.API_BASE + '*', (req, res, next) => {
      if (req.path.includes(process.env.API_BASE + 'login')) return next();

      return this.auth.authenticate((err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          if (info.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Your token has expired. Please generate a new one' });
          } else {
            return res.status(401).json({ message: info.message });
          }
        }
        this.app.set('user', user);
        return next();
      })(req, res, next);
    });
  }

  private mongoSetup(): void {
    (<any>mongoose).Promise = require('bluebird');
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  }

}

export default new App().app;