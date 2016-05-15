angular.module('orthoApp')
    .controller('dashboardCtrl', function($scope) {

      $scope.mainTab = true;
      $scope.paymentTab = false;
      $scope.settingsTab = false;

      $scope.showMain = function() {
        $scope.mainTab = true;
        $scope.paymentTab = false;
        $scope.settingsTab = false;
      };
      $scope.showPayment = function() {
        $scope.mainTab = false;
        $scope.paymentTab = true;
        $scope.settingsTab = false;
      };
      $scope.showSettings = function() {
        $scope.mainTab = false;
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
