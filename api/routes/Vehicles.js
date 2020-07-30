const express = require('express');
const router = express.Router();
const VehicleModel = require('../models/VehicleModel');

function findVehicleById(vehicleId) {
  return new Promise((resolve, reject) => {
    VehicleModel
      .findOne({ _id: vehicleId })
      .populate('jobs')
      .exec((err, foundVehicle) => {
      if(err) {
        reject(err);
      } else if (foundVehicle === (undefined || null)) {
        reject(null);
      } else {
        resolve(foundVehicle);
      }
    });
  });
}

router.get('/', async (req, res, next) => {
  try {
    const vehicles = await VehicleModel.find();
    console.log(vehicles);
    res.json(vehicles);
  } catch (err) {
    // res.json({message: err});
    // next(err);
    next({
      message: err.message,
      code: 500,
    })
  }
});

/**
 * Probably not needed. delete if possible.
 */
router.get('/:id', (req, res) => {
  try {
    findVehicleById(req.params.id)
      .then(foundVehicle => {
        res.status(200).json(foundVehicle);
      })
      .catch(err => {
        if (!err) {
          next({
            message: `No vehicle found: ${req.params.id}`,
            code: 400,
          });
        } else {
          next({
            message: err.message,
            code: 500,
          })
        }
      });
  } catch (err) {
    // res.status(500).json(err);
    next({
      message: err.message,
      code: 500,
    })
  }
});

/**
 * Probably not needed. delete if possible.
 */
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
    next({
      message: err.message,
      code: 500,
    });
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
        // res.status(500).json({
        //   message: err.message,
        //   code: 500,
        // });
        next({
          message: err.message,
          code: 500,
        })
      }
    }
  } else {
    // console.log(req.body);
    // res.status(405).json({
    //   message: "Body is missing required values.",
    //   code: 400,
    // });
    next({
      message: "Body is missing required values.",
      code: 400,
    })
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const foundVehicle = await findVehicleById(req.params.id);
    if (foundVehicle) {
      console.log(req.body);
      Object.assign(foundVehicle, req.body);
      const savedVehicle = await foundVehicle.save();
      res.status(200).json(savedVehicle);
    } else {
      // res.status(400).json({
      //   message: `No vehicle found: ${req.params.id}`,
      //   code: 400,
      // });
      next({
        message: `No vehicle found: ${req.params.id}`,
        code: 400,
      });
    }
  } catch (err) {
    next({
      message: err.message,
      code: 500,
    });
  }
});

router.delete('/:id', (req, res) => {
  VehicleModel
  .deleteOne({_id: req.params.id})
  .exec()
    .then((delVehicle) => {
      res.status(200).json(delVehicle);
    })
    .catch((err) => {
      // res.status(500).json({
      //   message: err.message,
      //   code: 500,
      // });
      next({
        message: err.message,
        code: 500,
      });
    });
});

module.exports = router;