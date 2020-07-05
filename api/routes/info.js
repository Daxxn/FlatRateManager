const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('info', {baseUrl: req.url});
});

router.get('/users', (req, res) => {
  res.render('usersInfo');
});

router.get('/jobs', (req, res) => {
  res.render('jobsInfo');
});

router.get('/vehicles', (req, res) => {
  res.render('vehiclesInfo');
})

module.exports = router;