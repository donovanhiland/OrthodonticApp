angular.module('orthoApp')
    .controller('dashboardCtrl', function($scope, accountService) {

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
        $scope.updateEmailBool = false;
        $scope.updateNumberBool = false;
        $scope.editEmail = function() {
            $scope.updateEmailBool = true;
            $scope.updateNumberBool = false;
            $('#email-update').css({
                width: $('#email-info').width() + 'px'
            });
        };
        $scope.editPhoneNumber = function() {
            $scope.updateNumberBool = true;
            $scope.updateEmailBool = false;
            $('#phone-update').css({
                width: $('#phone-info').width() + 'px',
                maxWidth: '200px'
            });
        };

        $scope.getUsers = function() {
          //get pending users for doctor
        };

        $scope.userStatus = true;
        $scope.getCurrentUser = function() {
            accountService.getCurrentUser()
                .then(function(response) {
                    $scope.user = response.data;
                    $scope.pendingEmailChange = $scope.user.email;
                    $scope.pendingPhoneNumberChange = $scope.user.phoneNumber;

                    var status = $scope.user.status;
                    if(status === 'pending' || status === 'prospect') {
                      $scope.userStatus = false;
                      $scope.showPaperwork = true;
                    }
                    if(status === 'active' || status === 'graduated') {
                      $scope.userStatus = true;
                      $scope.showPaperwork = false;
                    }
                });
        };
        $scope.getCurrentUser();

        $scope.updateUser = function(field, info) {
          console.log($scope.user);
            if(info === $scope.user.phoneNumber || info === $scope.user.email) {
              $scope.updateEmailBool = false;
              $scope.updateNumberBool = false;
              return null;
            }
            if (field === 'email') {
                $scope.user.email = info;
            }
            if (field === 'phone') {
                $scope.user.phoneNumber = info;
            }
            accountService.updateCurrentUser($scope.user._id, $scope.user)
                .then(function(response) {
                    $scope.getCurrentUser();
                    $scope.updateEmailBool = false;
                    $scope.updateNumberBool = false;
                });
        };

        $scope.getAppointments = function(dateRange) {
          accountService.getAppointments(dateRange)
            .then(function(response) {
              //ng repeat over appointments
            });
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
