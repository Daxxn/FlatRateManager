const mongoose = require('mongoose');
const bCrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  userName: String,
  password: {
    type: String,
    required: [true, 'password is required!'],
  },
  token: String,
});

module.exports = mongoose.model('userModel', userSchema);