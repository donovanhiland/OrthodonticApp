angular.module('orthoApp')
    .service('accountService', function($http) {

        this.login = function(user) {
            return $http({
                method: 'POST',
                url: '/login',
                data: user
            }).then(function(response) {
                return response;
            });
        };

        this.logout = function() {
          return $http({
            method: 'GET',
            url: '/logout'
          }).then(function(response) {
            return response;
          })
        }

        this.checkAuth = function() {
          return $http ({
            method: 'GET',
            url: '/checkAuth'
          }).then(function(response) {{
            return response.data;
          }})
        }

        this.register = function(newUser) {
            return $http({
                method: 'POST',
                url: '/users',
                data: newUser
            }).then(function(response) {
                return response;
            });
        };

        this.getPending = function(query) {
            return $http({
                method: 'GET',
                url: '/users/pending?' + query
            }).then(function(response) {
                return response.data;
            });
        };

        this.searchUsers = function(search) {
          return $http ({
            method: 'POST',
            url: '/users/search',
            data: search
          }).then(function(response) {
            return response.data;
          })
        }

        this.getCurrentUser = function() {
            return $http({
                method: 'GET',
                url: '/me'
            }).then(function(response) {
                return response;
            });
        };

        this.getUserById = function(userId) {
            return $http({
                method: 'GET',
                url: '/users/' + userId
            }).then(function(response) {
                return response.data;
            });
        };

        this.updateCurrentUser = function(userId, newUserInfo) {
            return $http({
                method: 'PUT',
                url: '/users/' + userId,
                data: newUserInfo
            }).then(function(response) {
                return response;
            });
        };

        this.getAppointments = function(query) {
            return $http({
                method: 'POST',
                url: '/appointments',
                data: query
            }).then(function(response) {
                return response;
            });
        };

        this.scheduleAppointment = function(apptId, userId) {
            return $http({
                method: 'PUT',
                url: '/appointments/' + apptId,
                data: userId
            }).then(function(response) {
                return response;
            });
        };

        this.cancelAppointment = function(apptId, userId) {
            return $http({
                method: 'POST',
                url: '/appointments/' + apptId,
                data: userId
            }).then(function(response) {
                return response;
            });
        };

        this.createNote = function(noteData) {
            return $http({
                method: 'POST',
                url: '/notes',
                data: noteData
            }).then(function(response) {
                return response;
            });
        };

    });
