require('dotenv/config');

const checkAuthentication = (req, res, next) => {
  if (process.env.AUTH_DEV === 'false') {
    console.log('in auth checker');
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({
        message: 'login required.',
      });
    }
  } else {
    next();
  }
};

module.exports = checkAuthentication;
