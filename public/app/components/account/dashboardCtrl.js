angular.module('orthoApp')
    .controller('dashboardCtrl', function($scope) {

      // tab views
      $scope.homeTab = true;
      $scope.paymentTab = false;
      $scope.settingsTab = false;
      // dr only
      $scope.patientTab = false;
      $scope.patientTabTab = false;

      $scope.showHome = function() {
        $scope.homeTab = true;
        $scope.paymentTab = false;
        $scope.settingsTab = false;
      };
      $scope.showPatient = function() {
        $scope.homeTab = false;
        $scope.patientTab = true;
        $scope.patientTabTab = true;
      };
      $scope.closePatient = function() {
        $scope.homeTab = true;
        $scope.patientTab = false;
        $scope.patientTabTab = false;
      };
      $scope.showPayment = function() {
        $scope.homeTab = false;
        $scope.paymentTab = true;
        $scope.settingsTab = false;
      };
      $scope.showSettings = function() {
        $scope.homeTab = false;
        $scope.paymentTab = false;
        $scope.settingsTab = true;
      };

        /*** Dashbaord Jquery ***/

        var tab = $('.dashboard-tab');

        tab.click(function() {
            if (tab.hasClass('selected')) {
                tab.removeClass('selected').addClass('blurred');
            }
            if (!$(this).hasClass('selected')) {
                $(this).addClass('selected').removeClass('blurred');
            }
        });
        
    });
