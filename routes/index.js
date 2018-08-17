var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('cinema/home', { title: 'Ha Tin Cinema' });
});

router.get('/create', function(req, res, next) {
  res.render('cinema/create', { title: 'Create Movie' });
});

module.exports = router;
