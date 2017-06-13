var pilotdata = require('./pilotdata.controller.js')

module.exports = function (app, auth, mail, settings, models, logger) {
  // GET
  app.get('/api/pilotdata/', pilotdata.getPilotdata)
  app.get('/api/pilotdata/:pilotdataId', pilotdata.getPilotdataById)
  // POST
  app.post('/api/pilotdata', pilotdata.postPilotdata)
  // PUT
  app.put('/api/pilotdata/:pilotdataId', pilotdata.putPilotdata)
  // DELETE
  app.delete('/api/pilotdata/:pilotdataId', pilotdata.deletePilotdata)
  // PARAM
  app.param('pilotdataId', pilotdata.paramPilotdata)
}
