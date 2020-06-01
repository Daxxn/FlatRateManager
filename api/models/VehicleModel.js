const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const vehicleSchema = mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  jobs: [ObjectId],
});

module.exports = mongoose.model('VehicleModel', vehicleSchema);