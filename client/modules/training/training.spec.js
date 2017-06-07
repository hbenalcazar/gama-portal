describe('Generated Training Testing', function () {
  beforeEach(module('app.training'))
  beforeEach(module('app.core'))
  beforeEach(module('app.user'))

  describe('routes', function () {
    var states = {}
    beforeEach(inject(function ($state) {
      states.list = $state.get('trainingList')
      states.view = $state.get('trainingView')
      states.create = $state.get('trainingCreate')
      states.edit = $state.get('trainingEdit')
    }))

    describe('list', function () {
      it('should have the correct url', function () {
        expect(states.list.url).to.equal('/training/list')
      })

      it('should have the correct templateUrl', function () {
        expect(states.list.templateUrl).to.equal('modules/training/list.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.list.controller).to.equal('TrainingController')
      })
    })

    describe('view', function () {
      it('should have the correct url', function () {
        expect(states.view.url).to.equal('/training/view/:id')
      })

      it('should have the correct templateUrl', function () {
        expect(states.view.templateUrl).to.equal('modules/training/view.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.view.controller).to.equal('TrainingController')
      })
    })

    describe('create', function () {
      it('should have the correct url', function () {
        expect(states.create.url).to.equal('/training/create')
      })

      it('should have the correct templateUrl', function () {
        expect(states.create.templateUrl).to.equal('modules/training/create.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.create.controller).to.equal('TrainingController')
      })
    })

    describe('edit', function () {
      it('should have the correct url', function () {
        expect(states.edit.url).to.equal('/training/edit/:id')
      })

      it('should have the correct templateUrl', function () {
        expect(states.edit.templateUrl).to.equal('modules/training/edit.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.edit.controller).to.equal('TrainingController')
      })
    })
  })

  describe('controller', function () {
    var $httpBackend
    var $stateParams
    var $location
    var TrainingController
    var authResponse = {
      user: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlIjp7ImdlbmRlciI6Ik1hbGUiLCJsb2NhdGlvbiI6IkludGVybmF0aW9uYWwiLCJ3ZWJzaXRlIjoiZ29vZ2xlLmNvbSIsInBpY3R1cmUiOiIiLCJuYW1lIjoiVGVzdCBVc2VyIn0sInJvbGVzIjpbXSwiZ3JhdmF0YXIiOiJodHRwczovL2dyYXZhdGFyLmNvbS9hdmF0YXIvZDViYjRmZmZmYTZhMzI0MjhjN2UzMTBjMzQxYjRmN2I_cz0yMDAmZD1yZXRybyIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsIl9pZCI6IjU3MTdhMmQ1MGI1ZTQ0YWE1ZTU0NjQ4YiIsImlhdCI6MTQ2MTE2NzQ5NSwiZXhwIjoxNDYxMTc0Njk1fQ.tsAiRGB-lUhnD70XXtliNsTzQj3gKLA0a28yTJWoo8c'
    }
    var trainingId = '571a6803389f702a5c16dfa1'
    var timestamp = new Date()
    var getMockTrainingData = function () {
      return {
        _id: trainingId,
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
      TrainingController = $controller('TrainingController', {$scope: $scope})
    }))

    it('should exist', function () {
      expect(TrainingController).to.exist
    })

    it('vm.list() should return an array of trainings from GET request and store it in vm', function () {
      $httpBackend.whenGET(/\/api\/v1\/Training\?noCache=\d+/).respond({
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

      TrainingController.list()
      $httpBackend.flush()

      var sameTrainings = angular.equals(TrainingController.trainings,
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

      expect(sameTrainings).to.equal(true)
    })

    it('vm.find() should return a training from GET request and store it in vm', function () {
      $httpBackend.whenGET(/\/api\/v1\/Training\/[\w\d]+\?noCache=\d+/)
        .respond({data: getMockTrainingData()})

      // find() relies on id state param being present
      $stateParams.id = trainingId
      TrainingController.find()
      $httpBackend.flush()

      var sameTraining = angular.equals(TrainingController.training, getMockTrainingData())

      expect(sameTraining).to.equal(true)
    })

    it('vm.create() should return a training from POST request and redirect to training list', function () {
      $httpBackend.whenPOST(/api\/v1\/Training/)
        .respond({
          data: {
            data: getMockTrainingData()
          }
        })

      // Mimic form inputs
      TrainingController.training.title = getMockTrainingData().title
      TrainingController.training.content = getMockTrainingData().content

      TrainingController.create(true)
      $httpBackend.flush()

      var sameTraining = angular.equals(TrainingController.training, getMockTrainingData())

      expect(sameTraining).to.equal(true)
      expect($location.path()).to.equal('/training/list')
    })

    it('vm.update() should return a training from PUT request and redirect to training view', function () {
      $httpBackend.whenPUT(/\/api\/v1\/Training\/[\w\d]+/)
        .respond({
          data: getMockTrainingData()
        })

      TrainingController.training = getMockTrainingData()

      // Mimic form inputs
      TrainingController.training.title = getMockTrainingData().title
      TrainingController.training.content = getMockTrainingData().content

      // update() relies on id state param being present
      $stateParams.id = trainingId
      TrainingController.update(true)
      $httpBackend.flush()

      var sameTraining = angular.equals(TrainingController.training, getMockTrainingData())

      expect(sameTraining).to.equal(true)
      expect($location.path()).to.equal('/training/view/' + TrainingController.training._id)
    })

    it('vm.delete() should send a DELETE request with a valid training id and delete the training from the view model', function () {
      $httpBackend.whenDELETE(/api\/v1\/Training\/([0-9a-fA-F]{24})$/)
        .respond(204)

      // Initialize training posts as in the training list view
      TrainingController.trainings = [getMockTrainingData()]
      expect(TrainingController.trainings.length).to.equal(1)

      TrainingController.delete(TrainingController.trainings[0]._id)
      $httpBackend.flush()

      expect(TrainingController.trainings.length).to.equal(0)
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
