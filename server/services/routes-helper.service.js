'use strict'

exports.allow = function (accessLevel) {
  return (req, res, next) => {
    if (!(accessLevel & req.user.role)) { res.sendStatus(403); return }
    next()
  }
}