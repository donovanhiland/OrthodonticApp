angular.module('orthoApp')
    .controller('doctorDashboardCtrl', function($scope, accountService) {

        $scope.homeTab = true;
        $scope.patientTab = false;
        $scope.patientTabTab = false;
        $scope.searchPatientsBool = false;
        $scope.showHome = function() {
            $scope.homeTab = true;
            $scope.patientTab = false;
        };
        $scope.showPatient = function(index, selection) {
            // var tab = $('.dashboard-tab');
            tab.removeClass('selected').addClass('blurred');
            $('#patient').addClass('selected').removeClass('blurred');

            $scope.homeTab = false;
            $scope.patientTab = true;
            $scope.patientTabTab = true;

            if (selection === 'search') var userId = $scope.searchedPatientList[index]._id;
            if (selection === 'pending') var userId = $scope.pendingPatientList[index]._id;
            if(selection === 'schedule') var userId = $scope.schedule[index].user._id;
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

            tab.addClass('selected').removeClass('blurred');
            $('#patient').removeClass('selected').addClass('blurred');

            $scope.getPending();
        };

        $scope.getCurrentUser = function() {
            accountService.getCurrentUser()
                .then(function(response) {
                    $scope.user = response.data;
                });
        };
        $scope.getCurrentUser();

        $scope.getPending = function() {
            accountService.getPending('status=pending')
                .then(function(response) {
                    if (response.length === 0) {
                        $scope.pendingPatientsBool = false;
                    }
                    if (response.length > 0) {
                        $scope.pendingPatientsBool = true;
                        $scope.pendingPatientList = response;
                    }
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

        $scope.searchUsers = function(lastname, firstname) {
            var query = {};
            if (firstname) query.firstname = firstname;
            if (lastname) query.lastname = lastname;
            if(!firstname && !lastname) return null;
            $scope.searchedPatientsBool = true;
            accountService.searchUsers(query)
                .then(function(response) {
                    $scope.searchedPatientList = response;
                    $scope.queryLastname = '';
                    $scope.queryFirstname = '';
                });
        };

        $scope.getSchedule = function(date) {
            var now = moment().toDate();
            var startDate = date;
            var endDate = moment(date).add(1, 'days').startOf('day').toDate();
            var query;

            if (date) {
                if (startDate < moment().toDate()) {
                    query = {
                        date: {
                            $gte: moment().toDate(),
                            $lte: endDate,
                        },
                        user: {
                            $exists: true
                        }
                    };
                }
                if (startDate >= moment().toDate()) {
                    query = {
                        date: {
                            $gte: startDate,
                            $lte: endDate,
                        },
                        user: {
                            $exists: true
                        }
                    };
                }
            }
            else {
              query = {
                  date: {
                      $gte: moment().toDate(),
                      $lte: endDate,
                  },
                  user: {
                      $exists: true
                  }
              };
            }
            accountService.getSchedule(query)
            .then(function(response) {
              $scope.getScheduleBool = true;
              $scope.schedule = response.data;
            });
        }

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
                                $scope.noteText = '';
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
