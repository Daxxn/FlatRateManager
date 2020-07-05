const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user);
  res.render('index', { title: 'Flat Rate Time Manager API', userName: req.session.user ? req.session.user.userName : 'no user logged in.' });
});

module.exports = router;
