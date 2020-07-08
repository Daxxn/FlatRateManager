const express = require('express');
const router = express.Router();
const VehicleModel = require('../models/VehicleModel');

function findVehicleById(vehicleId) {
  return new Promise((resolve, reject) => {
    VehicleModel
      .findOne({_id: vehicleId})
      .exec((err, foundVehicle) => {
      if(err) {
        reject(err);
      } else if (foundVehicle === (undefined || null)) {
        reject(new Error('no vehicle found'));
      } else {
        resolve(foundVehicle);
      }
    });
  });
}

async function getAllJobs(vehicle) {
  return await vehicle.populate('jobs').execPopulate();
}

router.get('/', async (req, res, next) => {
  try {
    const vehicles = await VehicleModel.find();
    console.log(vehicles);
    res.json(vehicles);
  } catch (err) {
    res.json({message: err});
    next(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    findVehicleById(req.params.id)
      .then(foundVehicle => {
        res.status(200).json(foundVehicle);
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/blank', async (req, res, next) => {
  const newVehicle = new VehicleModel({
    make: 'blank',
    model: 'blank',
    year: 0,
  });
  try {
    const resvehicle = await newVehicle.save();
    res.status(200).json(resvehicle);
  } catch (err) {
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  if (req.body) {
    if (req.body.make && req.body.model && req.body.year) {
      try {
        if (req.body._id) {
          delete req.body._id;
        }
        const newVehicle = new VehicleModel({
          make: req.body.make,
          model: req.body.model,
          year: req.body.year,
          jobs: req.body.jobs,
        });
        const resVehicle = await newVehicle.save();
        res.status(200).json(resVehicle);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } else {
    console.log(req.body);
    res.status(405).json({
      message: "Body is missing required values.",
    });
  }
});

router.patch('/:id', (req, res, next) => {
  findVehicleById(req.params.id)
    .then((vehicle) => {
      if (req.body) {
        vehicle = Object.assign(vehicle, req.body);
        vehicle.save();

        res.status(200).json(vehicle);
      } else {
        throw new Error('failed');
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/:id', (req, res) => {
  VehicleModel.deleteOne({_id: req.params.id}).exec()
  .then((delVehicle) => {
    res.status(200).json(delVehicle);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
  // VehicleModel.findByIdAndRemove(req.params.id)
  //   .then((delVehicle) => {
  //     res.status(200).json(delVehicle);
  //   })
  //   .catch((err) => {
  //     res.status(500).json(err);
  //   });
});

module.exports = router;