var training = require('./training.controller.js')

module.exports = function (app, auth, mail, settings, models, logger) {
  // GET
  app.get('/api/training/', training.getTraining)
  app.get('/api/training/:trainingId', training.getTrainingById)
  // POST
  app.post('/api/training', training.postTraining)
  // PUT
  app.put('/api/training/:trainingId', training.putTraining)
  // DELETE
  app.delete('/api/training/:trainingId', training.deleteTraining)
  // PARAM
  app.param('trainingId', training.paramTraining)
}
