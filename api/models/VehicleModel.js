const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const vehicleSchema = mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  jobs: [{type: ObjectId, ref: 'JobModel', default: []}],
});

vehicleSchema.post('find', async (vehicles) => {
  for (let vehicle of vehicles) {
    await vehicle.populate('jobs').execPopulate();
  }
});

vehicleSchema.post('findOne', async (vehicle) => {
  await vehicle.populate('jobs').execPopulate();
})

module.exports = mongoose.model('VehicleModel', vehicleSchema);