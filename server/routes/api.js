var express = require('express')
var router = express.Router()
var config = require('./../config.js')
var utils = require('./../utils.js')

var multer  = require('multer')
var upload = multer({fileFilter: utils.imageFilter})

var usersController = require('../controllers/users.controller')
var childrenController = require('../controllers/children.controller')
var zonesController = require('../controllers/zones.controller')
var articlesController = require('../controllers/articles.controller')
var cartsController = require('../controllers/carts.controller')
var imagesController = require('../controllers/images.controller')

var allowOnly = require('../services/routes-helper.service').allowOnly
var resourceOwner = require('../services/resource-owner.service').resourceOwner


var APIRoutes = (passport) => {
    
    // USERS
    router.get('/users', auth(config.accessLevels.admin, usersController.getAll))
    router.get('/users/current', auth(config.accessLevels.user, usersController.getCurrent))
    router.post('/users/authenticate', usersController.authenticate)
    router.post('/users/register', usersController.register)
    router.put('/users/:_id', auth(config.accessLevels.admin, usersController.update))
    router.delete('/users/:_id', auth(config.accessLevels.super_admin, usersController.delete))
    
    // CHILDREN
    router.get('/children', childrenController.getAll)
    router.get('/children/:_id', childrenController.getById)
    router.post('/children', auth(config.accessLevels.admin, childrenController.create))
    router.put('/children/:_id', auth(config.accessLevels.admin, childrenController.update))
    router.delete('/children/:_id', auth(config.accessLevels.super_admin, childrenController.delete))
    
    // ZONES
    router.get('/zones', zonesController.getAll)
    router.get('/zones/:_id', zonesController.getById)
    router.post('/zones', auth(config.accessLevels.admin, zonesController.create))
    router.put('/zones/:_id', auth(config.accessLevels.admin, zonesController.update))
    router.delete('/zones/:_id', auth(config.accessLevels.super_admin, zonesController.delete))

    // ARTICLES
    router.get('/articles', articlesController.getAll)
    router.get('/articles/:_id', articlesController.getById)
    router.post('/articles', auth(config.accessLevels.admin, articlesController.create))
    router.put('/articles/:_id', auth(config.accessLevels.admin, articlesController.update))
    router.delete('/articles/:_id', auth(config.accessLevels.super_admin, articlesController.delete))
    
    // CARTS
    router.get('/carts', auth(config.accessLevels.admin, cartsController.getAll))
    router.get('/carts/:_id', resourceOwner("carts"), auth(config.accessLevels.user, cartsController.getById))
    router.post('/carts', auth(config.accessLevels.user, cartsController.create))
    router.put('/carts/:_id', auth(config.accessLevels.admin, cartsController.update))
    router.delete('/carts/:_id', auth(config.accessLevels.super_admin, cartsController.delete))

    // IMAGES
    router.get('/images/:_id', imagesController.getById)
    router.post('/images', upload.single('childPhoto'), auth(config.accessLevels.admin, imagesController.create))
    router.put('/images/:_id', upload.single('childPhoto'), auth(config.accessLevels.admin, imagesController.update))
    router.delete('/images/:_id', auth(config.accessLevels.super_admin, imagesController.delete))
    
    // AUTH HELPER FUNCTION
    function auth( accessLevel, controller_function ){
        return [passport.authenticate('jwt', { session: false }), allowOnly(accessLevel, controller_function)]
    }

    return router
}

module.exports = APIRoutes