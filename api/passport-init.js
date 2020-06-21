const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./models/UserModel');
const bCrypt = require('bcrypt');

/**
 * A better way to do this is probably to pass this in from the user router.
 * But im not sure how to make that work yet.
 * @param {string} username The user name to find in the database.
 */
function findUser(username) {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ userName: username })
    .exec((err, user) => {
      if (err) {
        reject(err);
      } else if (!user) {
        resolve(null);
      } else {
        resolve(user);
      }
    })
  })
}

const initializePassport = (passport) => {
  const authenticate = async (userName, password, done) => {
    try {
      const foundUser = await findUser(userName);
      if (!foundUser) {
        return done(null, false, 'Your no the one that built this! GET OUT!');
      }

      if (await bCrypt.compare(password, foundUser.password)) {
        return done(null, foundUser);
      } else {
        return done(null, false, 'That password is wrong! REALLY GET OUT!!');
      }
    } catch (err) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy(authenticate));
};

module.exports = initializePassport;
