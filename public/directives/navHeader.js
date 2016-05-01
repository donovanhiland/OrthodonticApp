angular.module('orthoApp')
  .directive('navheadDir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'directives/navHeader.html'
    };

  });
