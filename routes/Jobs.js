const express = require('express');
const router = express.Router();
const JobModel = require('../models/JobModel');

router.get('/', async (req, res) => {
  try {
    const jobs = await JobModel.find();
    res.json(jobs);
  } catch (err) {
    res.json({message: err});
  }
});

router.post('/', async (req, res) => {
  const newJob = new JobModel({
    job: req.body.job,
    time: req.body.time,
  });
  try {
    const savedJob = await newJob.save();
    res.json(savedJob);
  } catch (err) {
    res.json({message: err});
  }
})

module.exports = router;