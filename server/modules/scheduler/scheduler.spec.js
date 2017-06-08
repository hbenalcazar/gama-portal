var assert = require('chai').assert
var request = require('supertest')

describe('Scheduler', function () {
  describe('GET /api/scheduler', function () {
    it('should be returning scheduler', function (done) {
      request('localhost:3000/')
        .get('api/scheduler')
        .expect(200, function (error, res) {
          if (error) return done(error)
          assert.deepEqual(res.body, [])
          done()
        })
    })
  })
})
