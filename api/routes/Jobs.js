const express = require('express');
const router = express.Router();
const JobModel = require('../models/JobModel');

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

function findManyJobs(jobIds) {
  const promises = [];
  for (const jobId of jobIds) {
    promises.push(findJobById(jobId));
  }
  return new Promise.all(promises);
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
  findJobById(req.params.id)
    .then((job) => {
      if (req.body) {
        job = Object.assign(job, req.body);
        job.save();
        res.status(200).json(job);
      } else {
        throw new Error('body must be an object with assignable parameters.');
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/many', (req, res, next) => {
  if(req.body.ids && req.body.jobs) {
    findManyJobs(req.body.ids)
      .then((foundJobs) => {
        
      })
  } else {
    next(new Error('Either id array or job array is not defined.'));
  }
})

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