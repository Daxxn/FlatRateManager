const express = require('express');

const router = express.Router();
const VehicleModel = require('../models/VehicleModel');

router.get('/', async (req, res) => {
  try {
    const vehicles = await VehicleModel.find();
    res.json(vehicles);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/', async (req, res) => {
  const newVehicle = new VehicleModel({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    jobs: req.body.jobs,
  });
  try {
    const savedVehicle = await newVehicle.save();
    res.json(savedVehicle);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put('/', async (req, res) => {
  try {
    res.json({ message: req.body });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
