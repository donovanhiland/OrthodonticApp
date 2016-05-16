angular.module('orthoApp')
  .directive('dbSettingsDir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'app/components/account/patientdashboard/dbSettingsDir.html',
      controller: function($scope) {

        $scope.updateNumberBool = false;
        $scope.updateEmailBool = false;
        $scope.contactNumber = '928 420 0056';
        $scope.contactEmail = 'donovan.hiland@gmail.com';

        $scope.toggleEditNumber = function() {
          $scope.updateNumberBool = true;
        };
        $scope.updateContactNumber = function() {
          $scope.updateNumberBool = !$scope.updateNumberBool;
          $('#phone-update').css({width: $('#phone-info').width() + 'px'});
        };
        $scope.toggleEditEmail = function() {
          $scope.updateEmailBool = true;
        };
        $scope.updateContactEmail = function() {
          $scope.updateEmailBool = !$scope.updateEmailBool;
          $('#email-update').css({width: $('#email-info').width() + 'px'});
        };
      }
    };

  });
