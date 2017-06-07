var assert = require('chai').assert
var request = require('supertest')

describe('Training', function () {
  describe('GET /api/training', function () {
    it('should be returning training', function (done) {
      request('localhost:3000/')
        .get('api/training')
        .expect(200, function (error, res) {
          if (error) return done(error)
          assert.deepEqual(res.body, [])
          done()
        })
    })
  })
})
