const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

const findUserById = (userId) => {
  return new Promise((resolve, reject) => {
    UserModel.findById(userId)
    .exec((err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

const findBy = (value, key) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({[key]: value})
      .exec((err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      })
  })
}

/* GET users listing. */
router.get('/', (req, res) => {
  res.status(401).json({ message: 'Must specify a user by ID.'});
});

router.get('/:userId', async (req, res, next) => {
  try {
    const foundUser = await findUserById(req.params.userId);
    if(foundUser) {
      delete foundUser.password;
      res.status(200).json(foundUser);
    } else {
      next(new Error('No user found.'));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  const foundUser = await findUserById(req.params.userId);
  if(!foundUser) {
    const newUser = new UserModel(req.body);
  } else {
    next(new Error('User already exists.'));
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const foundUser = await findBy(req.body.userName, 'userName');
    console.log(foundUser.password.validate('test'));
    res.send('done.');
  } catch (err) {
    next(err);
  }

});

router.post('/logout', (req, res, next) => {

});

router.patch('/:userId', async (req, res, next) => {
  try {
    
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId', async (req, res, next) => {

})

module.exports = router;
