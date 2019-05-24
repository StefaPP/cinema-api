const expressValidator = require('express-validator');
const cors = require('cors');
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/routes';
import * as mongoose from 'mongoose';
import { AuthController } from './controllers/auth';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

class App {

  public app: express.Application;
  public routePrv: Routes = new Routes();
  public mongoUrl: string = process.env.NODE_ENV !== 'production'
    ? `mongodb://127.0.0.1:27017/cincity${process.env.NODE_ENV === 'test' ? '_test' : ''}`
    : process.env.MONGODB_URI;

  public auth: AuthController = new AuthController();

  constructor() {
    this.app = express();
    this.app.use(expressValidator());
    this.mongoSetup();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(this.auth.initialize());
    this.app.use(cors());
    this.authenticate();
  }

  private authenticate(): any {
    this.app.all(process.env.API_BASE + '*', (req, res, next) => {
      if (req.method === 'OPTIONS') {
        const headers = {};
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
        headers['Access-Control-Allow-Credentials'] = false;
        headers['Access-Control-Max-Age'] = '86400';
        headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
        res.writeHead(200, headers);
        res.end();
      }

      if (['/login', '/register', '/populate'].includes(req.path)) return next();

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
        req.user = user;
        return next();
      })(req, res, next);
    });
  }

  private mongoSetup(): void {
    (<any>mongoose).Promise = require('bluebird');
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useCreateIndex: true });
  }

}

export default new App().app;