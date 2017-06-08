var scheduler = require('./scheduler.controller.js')

module.exports = function (app, auth, mail, settings, models, logger) {
  // GET
  app.get('/api/scheduler/', scheduler.getScheduler)
  app.get('/api/scheduler/:schedulerId', scheduler.getSchedulerById)
  // POST
  app.post('/api/scheduler', scheduler.postScheduler)
  // PUT
  app.put('/api/scheduler/:schedulerId', scheduler.putScheduler)
  // DELETE
  app.delete('/api/scheduler/:schedulerId', scheduler.deleteScheduler)
  // PARAM
  app.param('schedulerId', scheduler.paramScheduler)
}
