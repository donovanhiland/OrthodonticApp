angular.module('orthoApp')
  .directive('navheadDir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'directives/header/headerdir.html'
    };

  });
