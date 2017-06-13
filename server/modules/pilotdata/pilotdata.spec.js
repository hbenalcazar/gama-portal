var assert = require('chai').assert
var request = require('supertest')

describe('Pilotdata', function () {
  describe('GET /api/pilotdata', function () {
    it('should be returning pilotdata', function (done) {
      request('localhost:3000/')
        .get('api/pilotdata')
        .expect(200, function (error, res) {
          if (error) return done(error)
          assert.deepEqual(res.body, [])
          done()
        })
    })
  })
})
