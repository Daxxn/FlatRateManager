const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: String,
  password: String,
  token: String,
});

module.exports = mongoose.model('userModel', userSchema);