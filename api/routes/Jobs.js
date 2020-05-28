const express = require('express');

const router = express.Router();
const JobModel = require('../models/JobModel');

router.get('/', async (req, res) => {
  try {
    const jobs = await JobModel.find();
    res.json(jobs);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/', async (req, res) => {
  const newJob = new JobModel({
    job: req.body.job,
    time: req.body.time,
  });
  try {
    await newJob.save();
    res.json({ message: 'passed' });
  } catch (err) {
    res.json({ message: err });
  }
});

router.put('/', (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
