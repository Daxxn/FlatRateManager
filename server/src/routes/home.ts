import { Router, Express } from 'express';
import mongoose from 'mongoose';
import path from 'path';

const BuildHomeRoute = (db: typeof mongoose, baseDir: string): Router => {
  const router = Router();

  router.get('/', (req, res, next) => {
    try {
      res
        .status(200)
        .sendFile(path.join(baseDir, './public/static/index.html'));
    } catch (err) {
      next(err);
    }
  });

  return router;
};

export default BuildHomeRoute;
