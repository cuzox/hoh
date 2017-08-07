var express = require('express');
var router = express.Router();

var config = require('./../config.js');
var usersController = require('../controllers/users.controller');
var childrenController = require('../controllers/children.controller');
var allowOnly = require('../services/routes-helper.service').allowOnly;


var APIRoutes = (passport) => {
    
    // USERS
    router.post('/users/authenticate', usersController.authenticate);
    router.post('/users/register', usersController.register);
    router.get('/users', auth(config.accessLevels.admin, usersController.getAll));
    router.get('/users/current', auth(config.accessLevels.user, usersController.getCurrent));
    router.put('/users/:_id', auth(config.accessLevels.admin, usersController.update));
    router.delete('/users/:_id', auth(config.accessLevels.super_admin, usersController.delete));
    
    // CHILDREN
    router.get('/children', auth(config.accessLevels.user, childrenController.getAll));
    router.get('/children/:_id', auth(config.accessLevels.user, childrenController.getById));
    router.post('/children', auth(config.accessLevels.admin, childrenController.create));
    router.put('/children/:_id', auth(config.accessLevels.admin, childrenController.update));
    router.delete('/children/:_id', auth(config.accessLevels.admin, childrenController.delete));
    
    // AUTH HELPER FUNCTION
    function auth( accessLevel, controller_function ){
        return [passport.authenticate('jwt', { session: false }), allowOnly(accessLevel, controller_function)];
    }

    return router;
}

module.exports = APIRoutes;