import express, { Router } from 'express';
import mongoose from 'mongoose';
import { TechModel, createTechModel } from '../models/tech';

const router = express.Router();

const createTechRoute = (db: typeof mongoose): Router => {
  //# region Model Init
  const Tech: TechModel = createTechModel(db);
  //# endregion

  //# region GET Methods
  router.get('/', (req, res, next) => {
    try {
      res.status(500).json({ message: 'GET Not Implemented' });
    } catch (err) {
      next(err);
    }
  });
  //# endregion

  //# region POST Methods
  router.post('/:id', (req, res, next) => {
    try {
      res.status(500).json({ message: 'POST Not Implemented' });
    } catch (err) {
      next(err);
    }
  });
  //# endregion

  //# region PATCH Methods
  router.patch('/:id', (req, res, next) => {
    try {
      res.status(500).json({ message: 'PATCH Not Implemented' });
    } catch (err) {
      next(err);
    }
  });
  //# endregion

  //# region DELETE Methods
  router.delete('/:id', (req, res, next) => {
    try {
      res.status(500).json({ message: 'DELETE Not Implemented' });
    } catch (err) {
      next(err);
    }
  });
  //# endregion

  return router;
};

export default createTechRoute;
