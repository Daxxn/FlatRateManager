const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  job: String,
  time: Number,
});

module.exports = mongoose.model('JobModel', jobSchema);