angular.module('orthoApp')
  .directive('dbDrPatientDir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'app/components/account/doctorDashboard/dbDrPatient.html'
    };
    
  });
