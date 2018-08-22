const express = require('express')

const router = express.Router()
const fileUpload = require('express-fileupload')
const cinemaController = require('../controllers/cinemaController')
const authController = require('../controllers/authController')
const responseStatus = require('../configs/responseStatus')
const common = require('../shared/common')
router.get('/', async (req, res) => {
  try {
    let cinemas = await cinemaController.getCinemas()
    res.send({
      cinemas: cinemas
    })
  } catch (error) {
    res.send({
      error: error
    })
  }
})
router.post('/', fileUpload(), async (req, res) => {
  let fileName
  if (req.files) {
    fileName = req.files.file.name
    let imageFile = req.files.file
    imageFile.mv(__dirname + '/../../public/images/' + fileName, function (err) {
      if (err) {
        res.send({
          error: err
        })
      }
    })
  }
  try {
    if (fileName) {
      req.body.imgURL = `/images/${fileName}`
    }
    let parsedCookie = common.parseCookies(req)
    let authenUser = await authController.authenWithToken(parsedCookie.token)
    let cinema = await cinemaController.createCinema(req.body, authenUser._id)
    res.send({
      cinema: cinema
    })
  } catch (error) {
    res.send({
      error: error
    })
  }
})
router.get('/:link', async (req, res) => {
  try {
    let cinema = await cinemaController.getCinemaByLink(req.params.link)
    res.send({
      cinema: cinema
    })
  } catch (error) {
    res.send({
      error: error
    })
  }
})
const checkAuthentication = function (req, res, next) {
  let token = cookie.parse(req.headers['Cookie']).token
  if (token) {
    authController.authenWithToken(token)
      .then(() => {
        return next()
      })
      .catch(error => {
        res.status(error.status).send(error)
      })
  } else {
    res.status(401).send(responseStatus.Code401({ errorMessage: responseStatus.INVALID_REQUEST }))
  }
}
module.exports = router
