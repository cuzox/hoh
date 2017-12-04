var jwt = require('jsonwebtoken')
var mongojs = require('mongojs')
var config = require('../config')
var db = mongojs(config.dbConnectionString, ['users', 'carts'])

exports.resourceOwner = function(resource) {
    return (req, res, next) => {
        let resourceId = req.params._id
        let rawJwt = req.get("authorization").split(" ")[1]
        jwt.verify(rawJwt, config.secret, function(err, decoded) {
            if(err){ res.sendStatus(403); return }
            let userId = decoded._id
            db[resource].findOne({_id: resourceId}, (err, result)=>{
                if(err || result.userId && result.userId !== userId){ res.sendStatus(403); return }
                next()
            })
        })
    }
}