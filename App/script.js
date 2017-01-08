angular.module('ngRouteExample', ['ngRoute'])

  .controller('MainController', function ($scope, $route, $routeParams, $location, $window) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    //needs to be dynamic
    //also setup arrow keys and spacebar
    $scope.wordList = [];
    $scope.txtWordList;
    $scope.navigate = function (goHere) {
      var rt = '/Word/' + goHere;
      $location.path(rt);
    }
    angular.element($window).on('keydown', function (e) {
      //arrow keys and spacebar for nav
      if ($scope.current) { //should not process until word list generated
          if (e.keyCode === 32 || e.charCode === 32 || e.keyCode === 39 || e.charCode === 39) {
            $scope.next();
            $scope.$apply();
          }
          if (e.keyCode === 37 || e.charCode === 37) {
            $scope.previous();
            $scope.$apply();
          }
      }
      
    });
    $scope.next = function () {
      var i = $scope.getIndex($scope.current.index, 1);
      $scope.current = $scope.daWordObj[i];
      $scope.navigate($scope.daWordObj[i].name);
    };
    $scope.previous = function () {
      var i = $scope.getIndex($scope.current.index, -1);
      $scope.current = $scope.daWordObj[i];
      $scope.navigate($scope.daWordObj[i].name);
    };

    $scope.getIndex = function (currentIndex, shift) {
      var len = $scope.daWordObj.length;
      return (((currentIndex + shift) + len) % len)
    };
    $scope.saveWordList = function () {
      $scope.wordList = [];
      $scope.wordList = $scope.txtWordList.split(',');
      $scope.daWordObj = [];
      for (i = 0; i < $scope.wordList.length; i++) {
        $scope.daWordObj.push({ name: $scope.wordList[i], index: i });
      }
      $scope.navigate($scope.daWordObj[0].name);
      $scope.current = $scope.daWordObj[0];

    }

  })

  .controller('WordController', function ($scope, $routeParams) {
    $scope.name = "WordController";
    $scope.params = $routeParams;

  })

  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/Word/:wordId', {
        templateUrl: 'word.html',
        controller: 'WordController',
        resolve: {
          // I will cause a 1 second delay
          delay: function ($q, $timeout) {
            var delay = $q.defer();
            $timeout(delay.resolve, 1000);
            return delay.promise;
          }
        }
      })
      .when('/instructions', {
        templateUrl: 'instructions.html',
        controller: 'WordController'
      })
      .otherwise({
        redirectTo: '/instructions'
      });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
  });




