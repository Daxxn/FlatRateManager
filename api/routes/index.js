const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Flat Rate Time Manager API' });
});

module.exports = router;
