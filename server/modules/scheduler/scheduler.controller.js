exports.getScheduler = getScheduler
exports.deleteScheduler = deleteScheduler
exports.postScheduler = postScheduler
exports.putScheduler = putScheduler
exports.getSchedulerById = getSchedulerById
exports.paramScheduler = paramScheduler

var auto = require('run-auto')
var mongoose = require('mongoose')
var schedulers = mongoose.model('scheduler')
var _ = require('lodash')
//var logger = require('./../../logger.js').logger

function getScheduler (req, res, next) {
  auto({
    schedulers: function (cb) {
      schedulers
        .find()
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    return res.status(200).send(results.schedulers)
  })
}

function deleteScheduler (req, res, next) {
  req.scheduler.remove(function () {
    res.status(204).send()
  })
}

function postScheduler (req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  req.body.user = req.user._id
  schedulers.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}

function putScheduler (req, res, next) {
  req.scheduler = _.merge(req.scheduler, req.body)
  req.scheduler.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.scheduler)
  })
}


function getSchedulerById (req, res, next) {
  res.send(req.scheduler)
}

function paramScheduler (req, res, next, id) {
  req.assert('schedulerId', 'Your Scheduler ID cannot be blank').notEmpty()
  req.assert('schedulerId', 'Your Scheduler ID has to be a real id').isMongoId()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  auto({
    scheduler: function (cb) {
      schedulers
        .findOne({_id: id})
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    req.scheduler = results.scheduler
    next()
  })
}
