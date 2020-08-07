const express = require('express');
const router = express.Router();
const JobModel = require('../models/JobModel');
const VehicleModel = require('../models/VehicleModel');
const { response } = require('express');

function findJobById(jobId) {
  return new Promise((resolve, reject) => {
    JobModel
    .findOne({ _id: jobId })
    .exec((err, foundJob) => {
      if(err) {
        if (err.message.startsWith('Cast to ObjectId failed')) {
          reject(null);
        }
        reject(err);
      } else if (foundJob === (undefined || null)) {
        // reject(new Error('No job found.'));
        reject(null);
      } else {
        resolve(foundJob);
      }
    });
  });
}

const findManyJobs = (jobIds) => {
  const promises = [];
  for (const jobId of jobIds) {
    promises.push(findJobById(jobId));
  }
  return Promise.all(promises);
};

const updateJob = async (dbJob, newJob) => {
  Object.assign(dbJob, newJob);
  return dbJob.save();
}

const patchMany = (req, next) => {
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
    // next(new Error('Either id array or job array is not defined.'));
    next({
      message: 'Either id array or job array is not defined.',
      code: 400,
    });
  }
};

router.get('/', (req, res, next) => {
  if (req.body !== undefined) {
    delete req.body;
  }
  JobModel.find().exec()
    .then((jobs) => {
      res.status(200).json(jobs);
    })
    .catch((err) => {
      next({
        message: err.message,
        code: 500,
      });
    });
});

router.get('/:id', (req, res, next) => {
  findJobById(req.params.id)
    .then((job) => {
      res.status(200).json(job);
    })
    .catch((err) => {
      if (err) {
        next({
          message: err.message,
          code: 500,
        });
      } else {
        next({
          message: `No Job found: ${req.params.id}`,
          code: 400,
        });
      }
    });
});

router.post('/blank', async (req, res, next) => {
  try {
    const newJob = new JobModel({
      job: 'blank',
      time: 0,
    });
    res.status(200).json(await newJob.save());
  } catch (err) {
    next({
      message: err.message,
      code: 500,
    });
  }
});

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
        next({
          message: err.message,
          code: 500,
        });
      });
  } else {
    // next(new Error('body must be an object with assignable parameters.'));
    next({
      message: 'body must be an object with assignable parameters.',
      code: 400,
    });
  }
});

// Many portion still isnt working yet.
router.patch('/:id', async (req, res, next) => {
  if (req.params.id === 'many') {
    console.log(req.body);
    const allfoundJobs = await findManyJobs(req.body);
    const workingJobs = [];
    allfoundJobs.forEach(job => {
      const newJob = req.body.find(j => j._id === job._id);
      console.log(newJob);
      workingJobs.push(updateJob(job, newJob));
    });
    const updatedJobs = await Promise.all(workingJobs);
    res.status(200).json(updatedJobs);
  } else {
    try {
      const foundJob = await findJobById(req.params.id);
      Object.assign(foundJob, req.body);
      const savedJob = await foundJob.save();
      res.status(200).json(savedJob);
    } catch (err) {
      if (err) {
        next({
          message: err.message,
          code: 500,
        });
      } else {
        next({
          message: `No job found: ${req.params.id}`,
          code: 400,
        });
      }
    }
  }
});

// /**
//  * requires refactor.
//  */
// router.patch('/:id', (req, res, next) => {
//   if (req.params.id === 'many') {
//     const response = patchMany(req, next);
//     // res.status(200).json({
//     //   message: "saved",
//     //   data: response});
//     res.status(200).json(response);
//   } else {
//     findJobById(req.params.id)
//       .then((job) => {
//         if (req.body) {
//           job = Object.assign(job, req.body);
//           job.save();
//           res.status(200).json(job);
//           // res.status(200).json({
//           //   message: "saved",
//           //   data: job,
//           // });
//         } else {
//           throw new Error('body must be an object with assignable parameters.');
//         }
//       })
//       .catch((err) => {
//         //next(err);
//         res.status(500).json({
//           message: 'ERROR',
//           data: err,
//         });
//       });
//   }
// });

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
      next({
        message: err.message,
        code: 500,
      });
    })
});

module.exports = router;