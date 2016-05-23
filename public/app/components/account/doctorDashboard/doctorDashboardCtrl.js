angular.module('orthoApp')
    .controller('doctorDashboardCtrl', function($scope, accountService) {

        $scope.homeTab = true;
        $scope.patientTab = false;
        $scope.patientTabTab = false;
        $scope.showHome = function() {
            $scope.homeTab = true;
            $scope.patientTab = false;
        };
        $scope.showPatient = function(index) {
            tab.removeClass('selected').addClass('blurred');
            $('#new-tab').addClass('selected').removeClass('blurred');

            $scope.homeTab = false;
            $scope.patientTab = true;
            $scope.patientTabTab = true;
            var userId = $scope.pendingPatientList[index]._id;
            accountService.getUserById(userId)
                .then(function(response) {
                    $scope.selectedPatient = response;
                    if ($scope.selectedPatient.status === 'pending') {
                        $scope.activePatient = false;
                    } else {
                        $scope.activePatient = true;
                    }
                });
        };
        $scope.showPatientTab = function() {
            $scope.homeTab = false;
            $scope.patientTab = true;
            $scope.patientTabTab = true;
        };
        $scope.closePatient = function() {
            $scope.homeTab = true;
            $scope.patientTab = false;
            $scope.patientTabTab = false;
        };

        $scope.getPending = function() {
            accountService.getUsers('status=pending')
                .then(function(response) {
                    $scope.pendingPatientList = response;
                });
        };
        $scope.getPending();

        $scope.updateUser = function(balance, monthlyPaymentAmount, ett) {
            var userId = $scope.selectedPatient._id;
            if (balance && monthlyPaymentAmount && ett) {
                var userInfo = {
                    financial: {
                        initialbalance: balance,
                        monthlypaymentamount: monthlyPaymentAmount
                    },
                    ett: ett,
                    status: 'active'
                };
                accountService.updateCurrentUser(userId, userInfo)
                    .then(function(response) {
                        accountService.getUserById(userId)
                            .then(function(response) {
                                $scope.selectedPatient = response;
                                if ($scope.selectedPatient.status === 'active') {
                                    $scope.activePatient = true;
                                }
                            });
                    });
            }
        };

        $scope.createNote = function(noteText) {
            var userId = $scope.selectedPatient._id;
            if (noteText) {
                var noteData = {
                    user: $scope.selectedPatient._id,
                    date: new Date(),
                    text: noteText
                };
                accountService.createNote(noteData)
                    .then(function(response) {
                        accountService.getUserById(userId)
                            .then(function(response) {
                                $scope.selectedPatient = response;
                            });
                    });
            }
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
