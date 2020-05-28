const mongoose = require('mongoose');
const JobModel = require('./JobModel');

const vehicleSchema = mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  jobs: [JobModel.schema],
});

module.exports = mongoose.model('VehicleModel', vehicleSchema);
