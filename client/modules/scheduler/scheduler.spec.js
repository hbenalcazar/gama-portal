describe('Generated Scheduler Testing', function () {
  beforeEach(module('app.scheduler'))
  beforeEach(module('app.core'))
  beforeEach(module('app.user'))

  describe('routes', function () {
    var states = {}
    beforeEach(inject(function ($state) {
      states.list = $state.get('schedulerList')
      states.view = $state.get('schedulerView')
      states.create = $state.get('schedulerCreate')
      states.edit = $state.get('schedulerEdit')
    }))

    describe('list', function () {
      it('should have the correct url', function () {
        expect(states.list.url).to.equal('/scheduler/list')
      })

      it('should have the correct templateUrl', function () {
        expect(states.list.templateUrl).to.equal('modules/scheduler/list.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.list.controller).to.equal('SchedulerController')
      })
    })

    describe('view', function () {
      it('should have the correct url', function () {
        expect(states.view.url).to.equal('/scheduler/view/:id')
      })

      it('should have the correct templateUrl', function () {
        expect(states.view.templateUrl).to.equal('modules/scheduler/view.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.view.controller).to.equal('SchedulerController')
      })
    })

    describe('create', function () {
      it('should have the correct url', function () {
        expect(states.create.url).to.equal('/scheduler/create')
      })

      it('should have the correct templateUrl', function () {
        expect(states.create.templateUrl).to.equal('modules/scheduler/create.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.create.controller).to.equal('SchedulerController')
      })
    })

    describe('edit', function () {
      it('should have the correct url', function () {
        expect(states.edit.url).to.equal('/scheduler/edit/:id')
      })

      it('should have the correct templateUrl', function () {
        expect(states.edit.templateUrl).to.equal('modules/scheduler/edit.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.edit.controller).to.equal('SchedulerController')
      })
    })
  })

  describe('controller', function () {
    var $httpBackend
    var $stateParams
    var $location
    var SchedulerController
    var authResponse = {
      user: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlIjp7ImdlbmRlciI6Ik1hbGUiLCJsb2NhdGlvbiI6IkludGVybmF0aW9uYWwiLCJ3ZWJzaXRlIjoiZ29vZ2xlLmNvbSIsInBpY3R1cmUiOiIiLCJuYW1lIjoiVGVzdCBVc2VyIn0sInJvbGVzIjpbXSwiZ3JhdmF0YXIiOiJodHRwczovL2dyYXZhdGFyLmNvbS9hdmF0YXIvZDViYjRmZmZmYTZhMzI0MjhjN2UzMTBjMzQxYjRmN2I_cz0yMDAmZD1yZXRybyIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsIl9pZCI6IjU3MTdhMmQ1MGI1ZTQ0YWE1ZTU0NjQ4YiIsImlhdCI6MTQ2MTE2NzQ5NSwiZXhwIjoxNDYxMTc0Njk1fQ.tsAiRGB-lUhnD70XXtliNsTzQj3gKLA0a28yTJWoo8c'
    }
    var schedulerId = '571a6803389f702a5c16dfa1'
    var timestamp = new Date()
    var getMockSchedulerData = function () {
      return {
        _id: schedulerId,
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
      SchedulerController = $controller('SchedulerController', {$scope: $scope})
    }))

    it('should exist', function () {
      expect(SchedulerController).to.exist
    })

    it('vm.list() should return an array of schedulers from GET request and store it in vm', function () {
      $httpBackend.whenGET(/\/api\/v1\/Scheduler\?noCache=\d+/).respond({
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

      SchedulerController.list()
      $httpBackend.flush()

      var sameSchedulers = angular.equals(SchedulerController.schedulers,
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

      expect(sameSchedulers).to.equal(true)
    })

    it('vm.find() should return a scheduler from GET request and store it in vm', function () {
      $httpBackend.whenGET(/\/api\/v1\/Scheduler\/[\w\d]+\?noCache=\d+/)
        .respond({data: getMockSchedulerData()})

      // find() relies on id state param being present
      $stateParams.id = schedulerId
      SchedulerController.find()
      $httpBackend.flush()

      var sameScheduler = angular.equals(SchedulerController.scheduler, getMockSchedulerData())

      expect(sameScheduler).to.equal(true)
    })

    it('vm.create() should return a scheduler from POST request and redirect to scheduler list', function () {
      $httpBackend.whenPOST(/api\/v1\/Scheduler/)
        .respond({
          data: {
            data: getMockSchedulerData()
          }
        })

      // Mimic form inputs
      SchedulerController.scheduler.title = getMockSchedulerData().title
      SchedulerController.scheduler.content = getMockSchedulerData().content

      SchedulerController.create(true)
      $httpBackend.flush()

      var sameScheduler = angular.equals(SchedulerController.scheduler, getMockSchedulerData())

      expect(sameScheduler).to.equal(true)
      expect($location.path()).to.equal('/scheduler/list')
    })

    it('vm.update() should return a scheduler from PUT request and redirect to scheduler view', function () {
      $httpBackend.whenPUT(/\/api\/v1\/Scheduler\/[\w\d]+/)
        .respond({
          data: getMockSchedulerData()
        })

      SchedulerController.scheduler = getMockSchedulerData()

      // Mimic form inputs
      SchedulerController.scheduler.title = getMockSchedulerData().title
      SchedulerController.scheduler.content = getMockSchedulerData().content

      // update() relies on id state param being present
      $stateParams.id = schedulerId
      SchedulerController.update(true)
      $httpBackend.flush()

      var sameScheduler = angular.equals(SchedulerController.scheduler, getMockSchedulerData())

      expect(sameScheduler).to.equal(true)
      expect($location.path()).to.equal('/scheduler/view/' + SchedulerController.scheduler._id)
    })

    it('vm.delete() should send a DELETE request with a valid scheduler id and delete the scheduler from the view model', function () {
      $httpBackend.whenDELETE(/api\/v1\/Scheduler\/([0-9a-fA-F]{24})$/)
        .respond(204)

      // Initialize scheduler posts as in the scheduler list view
      SchedulerController.schedulers = [getMockSchedulerData()]
      expect(SchedulerController.schedulers.length).to.equal(1)

      SchedulerController.delete(SchedulerController.schedulers[0]._id)
      $httpBackend.flush()

      expect(SchedulerController.schedulers.length).to.equal(0)
    })
  })

  this.timeout(500)

  it('should take less than 500ms', function (done) {
    setTimeout(done, 300)
  })

  it('should take less than 500ms as well', function (done) {
    setTimeout(done, 200)
  })
})
