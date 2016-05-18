angular.module('orthoApp')
  .service('accountService', function($http) {

    var sitePath = 'http://localhost:9001';

    this.login = function(user) {
      return $http ({
        method: 'POST',
        url: '/login',
        data: user
      }).then(function(response) {
        return response;
      });
    };

    this.register = function(newUser) {

    };

    this.getCurrentUser = function() {
      return $http ({
        method: 'GET',
        url: '/me'
      }).then(function(response) {
        return response;
      });
    };

    this.updateCurrentUser = function(userId, newUserInfo) {
      return $http ({
        method: 'PUT',
        url: '/users/' + userId,
        data: newUserInfo
      }).then(function(response) {
        return response;
      });
    };

  });
