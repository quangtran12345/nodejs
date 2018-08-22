var express = require('express')
var router = express.Router()

/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('cinema/home', { title: 'My Cinema', token: ''})
})

router.get('/create', function (req, res, next) {
  res.render('cinema/create', { title: 'Create Movie', filmId: '' })
})
router.get('/film/:link', function (req, res, next) {
  res.render('cinema/detail', { title: '' })
})
router.get('/film/:link/edit', function (req, res, next) {
  res.render('cinema/create', { title: 'Edit', filmId: req.params.link })
})
router.get('/register', function (req, res, next) {
  res.render('cinema/register', { title: 'Register' })
})
router.get('/login', function (req, res, next) {
  res.render('cinema/login', { title: 'Login' })
})
router.get('/user/:id', function (req, res, next) {
  res.render('cinema/profile', { title: 'Profile' })
})

module.exports = router
