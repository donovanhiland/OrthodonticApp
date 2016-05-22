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
      return $http ({
        method: 'POST',
        url: '/users',
        data: newUser
      }).then(function(response) {
        return response;
      });
    };

    this.getUsers = function () {
      return $http ({
        method: 'GET',
        url: '/users'
      }).then(function(response) {
        return response;
      });
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

    this.getAppointments = function(query) {
      return $http ({
        method: 'POST',
        url: '/appointments',
        data: query
      }).then(function(response) {
        return response;
      });
    };

    this.scheduleAppointment = function(apptId, userId) {
      return $http ({
        method: 'PUT',
        url: '/appointments/' + apptId,
        data: userId
      }).then(function(response) {
        return response;
      });
    };

    this.cancelAppointment = function(apptId, userId) {
      return $http ({
        method: 'POST',
        url: '/appointments/' + apptId,
        data: userId
      }).then(function(response) {
        return response;
      });
    };

  });
