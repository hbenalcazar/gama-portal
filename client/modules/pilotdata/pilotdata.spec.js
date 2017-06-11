describe('Generated Pilotdata Testing', function () {
  
  beforeEach(module('app.pilotdata'))
  beforeEach(module('app.core'))
  beforeEach(module('app.user'))

  describe('routes', function () {
    var states = {}
    beforeEach(inject(function ($state) {
      //states.list = $state.get('pilotdataList')
      states.view = $state.get('pilotdataView')
      //states.create = $state.get('pilotdataCreate')
      states.edit = $state.get('pilotdataEdit')
    }))

/*
    describe('list', function () {
      it('should have the correct url', function () {
        expect(states.list.url).to.equal('/pilotdata/list')
      })

      it('should have the correct templateUrl', function () {
        expect(states.list.templateUrl).to.equal('modules/pilotdata/list.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.list.controller).to.equal('PilotdataController')
      })
    })
*/
    describe('view', function () {
      it('should have the correct url', function () {
        expect(states.view.url).to.equal('/pilotdata/view/:id')
      })

      it('should have the correct templateUrl', function () {
        expect(states.view.templateUrl).to.equal('modules/pilotdata/view.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.view.controller).to.equal('PilotdataController')
      })
    })
/*
    describe('create', function () {
      it('should have the correct url', function () {
        expect(states.create.url).to.equal('/pilotdata/create')
      })

      it('should have the correct templateUrl', function () {
        expect(states.create.templateUrl).to.equal('modules/pilotdata/create.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.create.controller).to.equal('PilotdataController')
      })
    })
*/
    describe('edit', function () {
      it('should have the correct url', function () {
        expect(states.edit.url).to.equal('/pilotdata/edit/:id')
      })

      it('should have the correct templateUrl', function () {
        expect(states.edit.templateUrl).to.equal('modules/pilotdata/edit.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.edit.controller).to.equal('PilotdataController')
      })
    })
  })

  describe('controller', function () {
    var $httpBackend
    var $stateParams
    var $location
    var PilotdataController
    var authResponse = {
      user: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlIjp7ImdlbmRlciI6Ik1hbGUiLCJsb2NhdGlvbiI6IkludGVybmF0aW9uYWwiLCJ3ZWJzaXRlIjoiZ29vZ2xlLmNvbSIsInBpY3R1cmUiOiIiLCJuYW1lIjoiVGVzdCBVc2VyIn0sInJvbGVzIjpbXSwiZ3JhdmF0YXIiOiJodHRwczovL2dyYXZhdGFyLmNvbS9hdmF0YXIvZDViYjRmZmZmYTZhMzI0MjhjN2UzMTBjMzQxYjRmN2I_cz0yMDAmZD1yZXRybyIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsIl9pZCI6IjU3MTdhMmQ1MGI1ZTQ0YWE1ZTU0NjQ4YiIsImlhdCI6MTQ2MTE2NzQ5NSwiZXhwIjoxNDYxMTc0Njk1fQ.tsAiRGB-lUhnD70XXtliNsTzQj3gKLA0a28yTJWoo8c'
    }
    var pilotdataId = '571a6803389f702a5c16dfa1'
    var timestamp = new Date()

    var getMockPilotdataData = function () {
      return {
        _id: pilotdataId,
        title: 'Nodejs',
        content: 'Try it out',
        created: timestamp
      }
    }

    beforeEach(inject(function (_$httpBackend_, _$stateParams_, _$location_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_
      $stateParams = _$stateParams_
      $location = _$location_
      $httpBackend.when('GET', /\/api\/authenticate\?noCache=\d+/)
        .respond(200, authResponse)
      $httpBackend.when('GET', /modules\/\w+\/(\d|\w)+\.view\.html\?noCache=\d+/)
        .respond(200, '')
      var $scope = $rootScope.$new()
      PilotdataController = $controller('PilotdataController', {$scope: $scope})
    }))

    it('should exist', function () {
      expect(PilotdataController).to.exist
    })

/*
    it('vm.list() should return an array of pilotdatas from GET request and store it in vm', function () {
      $httpBackend.whenGET(/\/api\/v1\/Pilotdata\?noCache=\d+/).respond({
        data: [
          {
            title: 'Nodejs',
            content: 'Try it out',
            created: timestamp
          }, {
            title: 'Angularjs',
            content: 'v2 stable coming soon',
            created: timestamp
          }
        ]
      })

      PilotdataController.list()
      $httpBackend.flush()

      var samePilotdatas = angular.equals(PilotdataController.pilotdatas,
        [
          {
            title: 'Nodejs',
            content: 'Try it out',
            created: timestamp
          }, {
            title: 'Angularjs',
            content: 'v2 stable coming soon',
            created: timestamp
          }
        ]
      )

      expect(samePilotdatas).to.equal(true)
    })
*/

    it('vm.find() should return a pilotdata from GET request and store it in vm', function () {
      $httpBackend.whenGET(/\/api\/v1\/Pilotdata\/[\w\d]+\?noCache=\d+/)
        .respond({data: getMockPilotdataData()})

      // find() relies on id state param being present
      $stateParams.id = pilotdataId
      PilotdataController.find()
      $httpBackend.flush()

      var samePilotdata = angular.equals(PilotdataController.pilotdata, getMockPilotdataData())

      expect(samePilotdata).to.equal(true)
    })

/*
    it('vm.create() should return a pilotdata from POST request and redirect to pilotdata list', function () {
      $httpBackend.whenPOST(/api\/v1\/Pilotdata/)
        .respond({
          data: {
            data: getMockPilotdataData()
          }
        })

      // Mimic form inputs
      PilotdataController.pilotdata.title = getMockPilotdataData().title
      PilotdataController.pilotdata.content = getMockPilotdataData().content

      PilotdataController.create(true)
      $httpBackend.flush()

      var samePilotdata = angular.equals(PilotdataController.pilotdata, getMockPilotdataData())

      expect(samePilotdata).to.equal(true)
      expect($location.path()).to.equal('/pilotdata/list')
    })
  */

    it('vm.update() should return a pilotdata from PUT request and redirect to pilotdata view', function () {
      $httpBackend.whenPUT(/\/api\/v1\/Pilotdata\/[\w\d]+/)
        .respond({
          data: getMockPilotdataData()
        })

      PilotdataController.pilotdata = getMockPilotdataData()

      // Mimic form inputs
      PilotdataController.pilotdata.title = getMockPilotdataData().title
      PilotdataController.pilotdata.content = getMockPilotdataData().content

      // update() relies on id state param being present
      $stateParams.id = pilotdataId
      PilotdataController.update(true)
      $httpBackend.flush()

      var samePilotdata = angular.equals(PilotdataController.pilotdata, getMockPilotdataData())

      expect(samePilotdata).to.equal(true)
      expect($location.path()).to.equal('/pilotdata/view/' + PilotdataController.pilotdata._id)
    })

/*
    it('vm.delete() should send a DELETE request with a valid pilotdata id and delete the pilotdata from the view model', function () {
      $httpBackend.whenDELETE(/api\/v1\/Pilotdata\/([0-9a-fA-F]{24})$/)
        .respond(204)

      // Initialize pilotdata posts as in the pilotdata list view
      PilotdataController.pilotdatas = [getMockPilotdataData()]
      expect(PilotdataController.pilotdatas.length).to.equal(1)

      PilotdataController.delete(PilotdataController.pilotdatas[0]._id)
      $httpBackend.flush()

      expect(PilotdataController.pilotdatas.length).to.equal(0)
    })
*/

  })



  this.timeout(500)

  it('should take less than 500ms', function (done) {
    setTimeout(done, 300)
  })

  it('should take less than 500ms as well', function (done) {
    setTimeout(done, 200)
  })
})
