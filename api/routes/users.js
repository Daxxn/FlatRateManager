const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const bCrypt = require('bcrypt');

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

router.get('/id/:userId', async (req, res, next) => {
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
  const foundUser = await findBy(req.body.userName, 'userName');
  if(!foundUser) {
    const tempPassword = await bCrypt.hash(req.body.password, 10);
    const tempUser = req.body;
    tempUser.password = tempPassword;
    console.log(tempUser);
    const newUser = new UserModel(tempUser);
    newUser.save()
      .then(user => {
        res.status(201).json({
          message: 'new user registered.',
          user,
        });
      })
      .catch(err => {
        next(err);
      });
  } else {
    res.status(401).json({
      message: 'User already exists.',
    });
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const foundUser = await findBy(req.body.userName, 'userName');
    if (foundUser) {
      if (await bCrypt.compare(req.body.password, foundUser.password)) {
        req.session.user = foundUser;
        req.session.save(err => {
          if (err) {
            throw err;
          }
        });
        res.status(200).send('done.');
      } else {
        res.status(401).json({
          message: 'password is incorrect',
        });
      }
    } else {
      res.status(401).json({
        message: 'User not found.',
      });
    }
  } catch (err) {
    next(err);
  }

});

router.post('/logout', (req, res, next) => {
  if (req.session.user) {
    req.session.user = null;
    req.session.save(err => {
      if (err) {
        next(err);
      }
    });
  } else {
    res.status(401).json({
      message: 'no user logged in.',
    });
  }
});

router.patch('/update/:userId', async (req, res, next) => {
  try {
    if (req.session.user) {
      if (req.session.user._id
        && req.session.user._id === req.body._id) {
          findBy(req.body._id, '_id')
            .then(user => {
              user = Object.assign(user, req.body);
              user.save();
            });
          res.status(200).json({
            message: '',
          });
      }
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/delete', async (req, res, next) => {
  try {
    if (req.session.user) {
      if (req.session.user._id) {
        const foundUser = await findBy(req.session.user._id, '_id');
        if (!foundUser) {
          res.status(406).json({
            message: 'no user found',
          });
        }
        if (req.body.password && await bCrypt.compare(req.body.password, foundUser.password)) {
          if (foundUser) {
            UserModel.deleteOne({ _id: req.session.user._id })
            .exec()
            .then(del => {
              res.status(202).json({
                message: 'user deleted',
              });
              req.session.user = null;
              req.session.save();
            })
            .catch(err => next(err));
          }
        } else {
          res.status(401).json({
            message: 'password doesnt match.',
          })
        }
      } else {
        throw new Error('unknown user session problem.');
      }
    } else {
      res.status(401).json({
        message: 'Must be logged in to delete user.',
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/test', (req, res, next) => {
  if (req.session) {
    console.log(req.session);
    res.json({
      message: 'Test - REMOVE AFTER USER AUTH IS FIGURED OUT!!',
    });
  } else {
    next(new Error('No seesion!'));
  }
});

module.exports = router;
