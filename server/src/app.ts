import express, {
  NextFunction,
  Request,
  Response,
  Express,
  application,
} from 'express';
import logger from 'morgan';
import path from 'path';
import cors, { CorsOptions } from 'cors';
import dotEnv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import pug from 'pug';

dotEnv.config();

const InitExpress = (): Express => {
  const app = express();

  app.set('env', process.env.environment);
  app.set('views', './public/static/');
  app.set('view engine', pug);
  app.options('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  });
  return app;
};

const buildCors = () => {
  if (process.env.ENVIRONMENT === 'development') {
    return {
      allowedHeaders: [
        'Content-Type',
        'Access-Control-Allow-Origin',
        'Authorization',
      ],
      exposedHeaders: ['Set-Cookie', 'Content-Type'],
      origin: ['http://localhost:3000'],
      credentials: false,
    };
  }
  return {
    allowedHeaders: [
      'Content-Type',
      'Access-Control-Allow-Origin',
      'Authorization',
    ],
    exposedHeaders: ['Set-Cookie', 'Content-Type'],
    origin: ['http://localhost:3000'],
    credentials: true,
  };
};

const SetupExpress = (app: Express, corsOpt: CorsOptions): void => {
  app.use(cors(corsOpt));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  if (process.env.ENVIRONMENT === 'development') {
    app.use(logger('dev'));
  }

  if (app.get('env') === 'production') {
    app.set('trust-proxy', 1);
    //   sess.cookie.secure = true;
  }

  app.get('/', async (req, res, next) => {
    try {
      res
        .status(200)
        .sendFile(path.join(__dirname, '/public/static/index.html'));
    } catch (err) {
      next(err);
    }
  });

  //temp Swagger:
  app.get('/api', async (req, res, next) => {
    try {
      res.status(200).json({
        message: 'Swagger Page...',
      });
    } catch (err) {
      next(err);
    }
  });
};

// #region Routes
import BuildHomeRoute from './routes/home';

const BuildRoutes = (app: Express, db: typeof mongoose): void => {
  app.use('/home', BuildHomeRoute(db, __dirname));
};
// #endregion

const ConnectToDatabase = async (app: Express): Promise<void> => {
  try {
    const db = await mongoose.connect(
      process.env.ENVIRONMENT === 'development'
        ? process.env.DB_CONNECT_DEV
        : process.env.DB_CONNECT_PROD,
    );
    BuildRoutes(app, db);
  } catch (err) {
    if (process.env.ENVIRONMENT === 'development') {
      console.log(`Error during DB connection:\n\t${err}`);
    }
  }
};

const StartServer = (app: Express): void => {
  app.set('port', process.env.PORT);
  const server = http.createServer(app);

  const ServerCallback = (): void => {
    if (process.env.ENVIRONMENT === 'development') {
      console.log(
        `Server started...\n\tListening on port: ${process.env.PORT}`,
      );
    }
  };

  ConnectToDatabase(app)
    .then(() => {
      console.log('Connected to Database...');
      server.listen(process.env.PORT, ServerCallback);
    })
    .catch(err => {
      console.log(`Error during server start:\n\t${err}`);
    });
};

const main = (): Express => {
  const app = InitExpress();
  SetupExpress(app, buildCors());
  StartServer(app);
  return app;
};

export default main();
