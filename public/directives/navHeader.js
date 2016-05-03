angular.module('orthoApp')
  .directive('navheadDir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'directives/navHeader.html',
      controller: function($scope) {
        
        $scope.sociallinks = [{
          name: 'instagram',
          id: 'ig',
          path: './img/icons/instagram.png',
          alt: 'instagram link'
        },
        {
          name: 'twitter',
          id: 'tt',
          path: './img/icons/twitter.png',
          alt: 'twitter link'
        },
        {
          name: 'facebook',
          id: 'fb',
          path: './img/icons/facebook.png',
          alt: 'facebook link'
        }];
      }
    };

  });
