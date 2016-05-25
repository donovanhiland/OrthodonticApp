angular.module('orthoApp')
    .controller('patientDashboardCtrl', function($scope, accountService) {
        ///// NG SHOW BOOLEANS /////
        // tab views
        $scope.homeTab = true;
        $scope.paymentTab = false;
        $scope.settingsTab = false;
        $scope.appointmentExists = false;

        $scope.showHome = function() {
            $scope.homeTab = true;
            $scope.paymentTab = false;
            $scope.settingsTab = false;
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
        };
        $scope.editPhoneNumber = function() {
            $scope.updateNumberBool = true;
            $scope.updateEmailBool = false;
        };

        $scope.loadAnimation = function() {
            function load() {
                TweenMax.killAll();
                TweenMax.set('.loading-box', {
                    display: 'block',
                    opacity: 1
                })
                TweenMax.set([".container", '.icon', '.loader'], {
                    display: 'block',
                    opacity: 1
                })
                TweenMax.set(".curgle", {
                    display: "block"
                })
                TweenMax.set(".check", {
                    display: "none",
                    color: "#000"
                })
                TweenMax.set(".container", {
                    backgroundColor: "#ffffff"
                })
                setTimeout(function() {
                    finishLoadingAnimation();
                }, 800)
            }

            function finishLoadingAnimation() {
                TweenMax.set(".curgle", {
                    display: "none"
                })
                TweenMax.fromTo(".container", 1.6, {
                    rotationX: "0deg"
                }, {
                    rotationX: "720deg",
                    ease: Expo.easeOut
                })
                TweenMax.fromTo(".check", .4, {
                    scale: .2,
                    rotation: "0deg",
                    y: 0
                }, {
                    y: -160,
                    scale: 1,
                    display: "block",
                    ease: Quad.easeOut
                })
                TweenMax.to(".check", .8, {
                    rotation: "360deg"
                })
                TweenMax.to(".check", .4, {
                    y: 0,
                    ease: Quad.easeIn,
                    delay: .4,
                    onComplete: function() {
                        TweenMax.set(".container", {
                            backgroundColor: "#95E511"
                        })
                        TweenMax.set(".check", {
                            color: "#FFFFFF"
                        })

                        TweenMax.to([".container", ".check"], .08, {
                            y: 15,
                            ease: Quad.easeOut
                        })
                        TweenMax.to([".container", ".check"], 1.2, {
                            y: 0,
                            ease: Elastic.easeOut,
                            delay: .11
                        })
                        TweenMax.fromTo(".container", 1.2, {
                            scale: .9
                        }, {
                            scale: 1,
                            ease: Elastic.easeOut
                        })
                        TweenMax.fromTo(['.loading-box', '.container', '.icon', '.loader'], 1, {
                            opacity: 1
                        }, {
                            delay: .7,
                            opacity: 0,
                            display: 'none'
                        })
                    }
                })
            }
            load();
        }

        $scope.userStatus = true;
        $scope.getCurrentUser = function() {
            accountService.getCurrentUser()
                .then(function(response) {
                    $scope.user = response.data;
                    $scope.pendingEmailChange = $scope.user.email;
                    $scope.pendingPhoneNumberChange = $scope.user.phoneNumber;

                    var status = $scope.user.status;
                    var appointment = $scope.user.appointment;
                    if (status === 'pending' && !appointment) {
                        $scope.userStatus = false;
                        $scope.showPaperwork = true;
                        $scope.showConsult = true;
                        $scope.appointmentExists = false;
                    }
                    if (status === 'pending' && appointment) {
                        $scope.userStatus = false;
                        $scope.showPaperwork = true;
                        $scope.showConsult = false;
                        $scope.startSchedule = true;
                        $scope.appointmentExists = true;
                        // $scope.scheduleAppointmentBool = false;
                    }
                    if (status === 'active' && appointment) {
                        $scope.userStatus = true;
                        $scope.showPaperwork = true;
                        $scope.startSchedule = true;
                        $scope.appointmentExists = true;
                        // $scope.scheduleAppointmentBool = false;
                    }
                    if (status === 'active' && !appointment) {
                        $scope.userStatus = true;
                        $scope.showPaperwork = true;
                        $scope.startSchedule = true;
                        $scope.appointmentExists = false;
                    }
                });
        };
        $scope.getCurrentUser();

        $scope.updateUser = function(infoField, info) {
            if (info === $scope.user.phoneNumber || info === $scope.user.email) {
                $scope.updateEmailBool = false;
                $scope.updateNumberBool = false;
                return null;
            }
            if (infoField === 'email') {
                $scope.user.email = info;
            }
            if (infoField === 'phone') {
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
            $scope.searchAppointmentsBool = true;
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

            $scope.loadAnimation();

            $scope.scheduleAppointmentBool = false;

            var apptId = $scope.appointmentList[index]._id;
            var userId = $scope.user._id;
            var appointment = $scope.user.appointment;

            if (appointment) {
                // if (confirm("Are you sure? /nYour previously scheduled appointment will be put back up for grabs")) {
                accountService.cancelAppointment($scope.user.appointment._id, {
                    user: userId
                }).then(function(response) {
                    accountService.scheduleAppointment(apptId, {
                        user: userId
                    }).then(function(response) {
                        $scope.getCurrentUser();
                        $scope.appointmentExists = true;
                        // $scope.searchAppointmentsBool = false;
                        $scope.appointmentList = null;
                    });
                });
                // } else {
                //     $scope.scheduleAppointmentBool = true;
                // }
            }
            if (!appointment) {
                accountService.scheduleAppointment(apptId, {
                        user: userId
                    })
                    .then(function(response) {
                        $scope.getCurrentUser();
                        $scope.appointmentExists = true;
                    });
            }
        };

        $scope.cancelAppointment = function() {
            var userId = $scope.user._id;
            var apptId = $scope.user.appointment._id;
            if (confirm('Are you sure? Your previously scheduled appointment time will be put up for grabs. Press Ok to continue')) {
                accountService.cancelAppointment(apptId, {
                        user: userId
                    })
                    .then(function(response) {
                        $scope.loadAnimation();
                        $scope.getCurrentUser();
                    });
            }
        };

        //date picker

        $scope.myDate = new Date(moment().toDate());
        $scope.minDate = new Date(moment().toDate());
        $scope.maxDate = new Date(moment().add(44, 'days').toDate());

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
