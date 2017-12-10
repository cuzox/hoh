var express = require('express')
var router = express.Router()
var config = require('./../config.js')
var utils = require('./../utils.js')

var multer = require('multer')
var upload = multer({ fileFilter: utils.imageFilter })

var usersController = require('../controllers/users.controller')
var childrenController = require('../controllers/children.controller')
var zonesController = require('../controllers/zones.controller')
var articlesController = require('../controllers/articles.controller')
var cartsController = require('../controllers/carts.controller')
var imagesController = require('../controllers/images.controller')

var allow = require('../services/routes-helper.service').allow
var owner = require('../services/resource-owner.service').resourceOwner


var APIRoutes = (passport) => {

  /** USERS */
  router.get('/users', auth(), allow(config.accessLevels.admin), usersController.getAll)
  router.get('/users/current', auth(), allow(config.accessLevels.user), usersController.getCurrent)
  router.post('/users/authenticate', usersController.authenticate)
  router.post('/users/register', usersController.register)
  router.put('/users/:_id', auth(), allow(config.accessLevels.admin), usersController.update)
  router.delete('/users/:_id', auth(), allow(config.accessLevels.super_admin), usersController.delete)

  /** CHILDREN */
  router.get('/children', childrenController.getAll)
  router.get('/children/:_id', childrenController.getById)
  router.post('/children', auth(), allow(config.accessLevels.admin), childrenController.create)
  router.put('/children/:_id', auth(), allow(config.accessLevels.admin), childrenController.update)
  router.delete('/children/:_id', auth(), allow(config.accessLevels.super_admin), childrenController.delete)

  /** ZONES */
  router.get('/zones', zonesController.getAll)
  router.get('/zones/:_id', zonesController.getById)
  router.post('/zones', auth(), allow(config.accessLevels.admin), zonesController.create)
  router.put('/zones/:_id', auth(), allow(config.accessLevels.admin), zonesController.update)
  router.delete('/zones/:_id', auth(), allow(config.accessLevels.super_admin), zonesController.delete)

  /** ARTICLES */
  router.get('/articles', articlesController.getAll)
  router.get('/articles/:_id', articlesController.getById)
  router.post('/articles', auth(), allow(config.accessLevels.admin), articlesController.create)
  router.put('/articles/:_id', auth(), allow(config.accessLevels.admin), articlesController.update)
  router.delete('/articles/:_id', auth(), allow(config.accessLevels.super_admin), articlesController.delete)

  /** CARTS */
  router.use('/carts', auth()); /** Auth all requests to carts */
  router.get('/carts', allow(config.accessLevels.admin), cartsController.getAll)
  router.get('/carts/:_id', allow(config.accessLevels.user), owner("carts"), cartsController.getById)
  router.post('/carts/:_id/add/:childId', allow(config.accessLevels.user), owner("carts"), cartsController.updateAdd)
  router.post('/carts/:_id/remove/:childId', allow(config.accessLevels.user), owner("carts"), cartsController.updateRm)
  router.post('/carts', allow(config.accessLevels.user), cartsController.create)
  router.delete('/carts/:_id', allow(config.accessLevels.szuper_admin), cartsController.delete)

  /** IMAGES */
  router.get('/images/:_id', imagesController.getById)
  router.post('/images', auth(), allow(config.accessLevels.admin), upload.single('childPhoto'), imagesController.create)
  router.put('/images/:_id', auth(), allow(config.accessLevels.admin), upload.single('childPhoto'), imagesController.update)
  router.delete('/images/:_id', auth(), allow(config.accessLevels.super_admin), upload.single('childPhoto'), imagesController.delete)

  /** AUTH HELPER FUNCTION */
  function auth() {
    return passport.authenticate('jwt', { session: false })
  }

  return router
}

module.exports = APIRoutes