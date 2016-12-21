//TODO:
//Active Highlighted Nav Item
//Prev next navigation, that works
//hooking navigation into arrow keys

//angular.element(document.getElementsByTagName('head')).append(angular.element('<base href="' + window.location.pathname + '" />'));

angular.module('ngRouteExample', ['ngRoute'])

.controller('MainController', function($scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  //needs to be dynamic
  //also setup arrow keys and spacebar
  $scope.wordList = [];
  $scope.txtWordList;
  $scope.saveWordList = function () {
    $scope.wordList = [];
    $scope.wordList = $scope.txtWordList.split(',');
    var rt = '/Word/' + $scope.wordList[0];
    $location.path(rt);
  }
})

.controller('WordController', function($scope, $routeParams) {
  $scope.name = "WordController";
  $scope.params = $routeParams;
  
})


.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/Word/:wordId', {
      templateUrl: 'word.html',
      controller: 'WordController',
      resolve: {
        // I will cause a 1 second delay
        delay: function($q, $timeout) {
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

//]]> 