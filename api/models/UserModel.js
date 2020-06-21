const mongoose = require('mongoose');
const bCrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  userName: String,
  password: {
    type: String,
    validate: {
      // validator: (pwd) => {
      //   return bCrypt.compareSync(pwd, this.password);
      // },
      validator: (d) => {
        console.log('in validator : ' + d);
        return 'hello';
      },
      message: 'password doesnt match.',
    },
    required: [true, 'password is required!'],
  },
  token: String,
});

// userSchema.pre('save', async (next) => {
//   try {
//     this.password = await bCrypt.hash(this.password, 10);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = mongoose.model('userModel', userSchema);