const express = require('express');
const router = express.Router();
const JobModel = require('../models/JobModel');
const VehicleModel = require('../models/VehicleModel');

function findJobById(jobId) {
  return new Promise((resolve, reject) => {
    JobModel.findById(jobId).exec((err, foundJob) => {
      if(err) {
        reject(err);
      } else if (foundJob === (undefined || null)) {
        reject(new Error('No job found.'));
      } else {
        resolve(foundJob);
      }
    });
  });
}

function findVehicleById(vehicleId) {
  return new Promise((resolve, reject) => {
    VehicleModel
      .findById(vehicleId)
      .exec((err, foundVehicle) => {
        if (err) {
          reject(err);
        } else if (foundVehicle === (undefined || null)) {
          reject(new Error('No vehicle found.'));
        } else {
          resolve(foundVehicle);
        }
      })
  })
}

const buildJob = (body) => {
  if (body.job && body.time) {
    if (body._id) {
      delete body._id;
    }
    const newJob = new JobModel(body);
    return newJob.save();
  } else {
    throw new Error('job and time must be defined.');
  }
}

function findManyJobs(jobIds) {
  const promises = [];
  for (const jobId of jobIds) {
    promises.push(findJobById(jobId));
  }
  return Promise.all(promises);
}

function patchMany(req, next) {
  if(req.body.ids && req.body.jobs) {
    findManyJobs(req.body.ids)
      .then((foundJobs) => {
        foundJobs.forEach((job, i) => {
          job = Object.assign(job, req.body.jobs[i]);
          job.save();
        });
        console.log(foundJobs);
        return foundJobs;
      })
  } else {
    next(new Error('Either id array or job array is not defined.'));
  }
}

router.get('/', (req, res) => {
  if (req.body !== undefined) {
    delete req.body;
  }
  JobModel.find().exec()
    .then((jobs) => {
      res.status(200).json(jobs);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  findJobById(req.params.id)
    .then((job) => {
      res.status(200).json(job);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/:vehicleId', (req, res, next) => {
  findJobById(req.params.vehicleId)
    .then((job) => {
      if (req.body) {
        if (!req.body._id) {
          delete req.body._id;
        }
        const newJob = new JobModel(req.body);
        return newJob.save();
      } else {
        throw new Error('body must be an object with assignable parameters.');
      }
    })
    .then((savedJob) => {
      res.status(200).json(savedJob);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/:vehicleId/test', async (req, res, next) => {
  const newJob = await buildJob(req.body);
  findVehicleById(req.params.vehicleId)
    .then((vehicle) => {
      vehicle.jobs.push(newJob._id);
      console.log(vehicle);
      return vehicle.save();
    })
    .then((savedVehicle) => {
      res.status(200).json(savedVehicle);
    })
    .catch((err) => {
      next(err);
    })
})

router.post('/', (req, res, next) => {
  if (req.body) {
    if (!req.body._id) {
      delete req.body._id;
    }
    const newJob = new JobModel(req.body);
    newJob.save()
      .then((savedJob) => {
        res.status(200).json(savedJob);
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next(new Error('body must be an object with assignable parameters.'));
  }
})

router.patch('/:id', (req, res, next) => {
  if (req.params.id === 'many') {
    const response = patchMany(req, next);
    res.status(200).json({
      message: "saved",
      data: response});
  } else {
    findJobById(req.params.id)
      .then((job) => {
        if (req.body) {
          job = Object.assign(job, req.body);
          job.save();
          //res.status(200).json(job);
          res.status(200).json({
            message: "saved",
            data: job,
          });
        } else {
          throw new Error('body must be an object with assignable parameters.');
        }
      })
      .catch((err) => {
        //next(err);
        res.status(500).json({
          message: 'ERROR',
          data: err,
        });
      });
  }
});

// router.patch('/many/', (req, res, next) => {
//   if(req.body.ids && req.body.jobs) {
//     findManyJobs(req.body.ids)
//       .then((foundJobs) => {
//         // foundJobs.forEach((job) => {
//         //   job.save();
//         // });
//         console.log(foundJobs);
//         res.status(200).json(foundJobs);
//       })
//   } else {
//     next(new Error('Either id array or job array is not defined.'));
//   }
// })

router.delete('/:id', (req, res, next) => {
  JobModel.findByIdAndDelete(req.params.id).exec()
    .then((delJob) => {
      res.status(200).json(delJob);
    })
    .catch((err) => {
      next(err);
    })
})

module.exports = router;