angular.module('orthoApp')
  .service('signInService', function($http) {

    var sitePath = 'http://localhost:9001/#';

    this.login = function(user) {
      return $http ({
        method: 'POST',
        url: sitePath + '/login',
        data: user
      });
    };












  });
