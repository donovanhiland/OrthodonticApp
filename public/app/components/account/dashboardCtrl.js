angular.module('orthoApp')
    .controller('dashboardCtrl', function($scope, accountService) {
        ///// NG SHOW BOOLEANS /////
        // tab views
        $scope.homeTab = true;
        $scope.paymentTab = false;
        $scope.settingsTab = false;
        $scope.appointmentExists = false;
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
                    console.log($scope.user);
                    $scope.pendingEmailChange = $scope.user.email;
                    $scope.pendingPhoneNumberChange = $scope.user.phoneNumber;

                    var status = $scope.user.status;
                    var appointment = $scope.user.appointment;
                    if (status === 'pending' && !appointment) {
                        $scope.userStatus = true;
                        $scope.showPaperwork = true;
                        $scope.appointmentExists = false;
                    }
                    if (status === 'pending' && appointment) {
                        $scope.userStatus = false;
                        $scope.showPaperwork = true;
                        $scope.appointmentExists = true;
                    }
                    if (status === 'active' && appointment) {
                        $scope.userStatus = true;
                        $scope.showPaperwork = true;
                        $scope.appointmentExists = true;
                    }
                    if (status === 'active' && !appointment) {
                        $scope.userStatus = true;
                        $scope.showPaperwork = true;
                        $scope.appointmentExists = false;
                    }
                });
        };
        $scope.getCurrentUser();

        $scope.updateUser = function(field, info) {
            console.log($scope.user);
            if (info === $scope.user.phoneNumber || info === $scope.user.email) {
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

        $scope.getAppointments = function(date) {
            var now = moment().toDate();
            var startDate = date;
            var endDate = moment(date).add(1, 'days').startOf('day').toDate();
            var query;

            if (date) {
                if (startDate < moment().toDate()) {
                    console.log('dont show earlier appointments');
                    query = {
                        date: {
                            $gte: moment().toDate(),
                            $lte: endDate,
                        },
                        user: {
                            $exists: false
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
                            $exists: false
                        }
                    };
                }
            } else {
                query = {
                    user: {
                        $exists: false
                    }
                };
            }
            accountService.getAppointments(query)
                .then(function(response) {
                    $scope.appointmentList = response.data;
                });
        };

        $scope.scheduleAppointment = function(index) {

            var apptId = $scope.appointmentList[index]._id;
            var userId = $scope.user._id;

            accountService.scheduleAppointment(apptId, {
                    user: userId
                })
                .then(function(response) {
                    $scope.getCurrentUser();
                    console.log($scope.user);
                    $scope.appointmentExists = false;
                });
        };

        //date picker
        $scope.myDate = new Date(moment().toDate());
        $scope.minDate = new Date(moment().toDate());
        $scope.maxDate = new Date(moment().add(45, 'days').toDate());

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
