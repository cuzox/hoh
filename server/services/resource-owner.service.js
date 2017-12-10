var jwt = require('jsonwebtoken')
var mongojs = require('mongojs')
var config = require('../config')
var db = mongojs(config.dbConnectionString, ['users', 'carts'])

exports.resourceOwner = function (resource) {
  return (req, res, next) => {
    let resourceId = req.params._id
    let rawJwt = req.get("authorization").split(" ")[1]
    jwt.verify(rawJwt, config.secret, function (err, decoded) {
      if (err) { res.sendStatus(403); return }
      let userId = decoded._id
      let allowed = config.accessLevels.admin & req.user.role
      db[resource].findOne({ _id: resourceId }, (err, result) => {
        if (err) { res.sendStatus(403); return }
        else if (!result) { res.status(400).send(`No resource found in ${resource} with such Id`); return }
        else if ((result.userId && result.userId !== userId) && !allowed) { res.sendStatus(401); return }
        next()
      })
    })
  }
}