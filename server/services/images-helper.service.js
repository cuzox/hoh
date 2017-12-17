'use strict'

exports.imgPath = function (path) {
  return (req, res, next) => {
    req.imgPath = path
    next()
  }
}