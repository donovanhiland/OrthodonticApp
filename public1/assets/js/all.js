angular.module('orthoApp', ['ui.router', 'ngAnimate', 'ngMaterial']);

angular.module('orthoApp')
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        // home route
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/components/main/home/homeTmpl.html',
                controller: 'homeCtrl',
                resolve: {}
            })

        // patient information routes and subviews
        .state('patientinformation', {
                url: '/patientinformation',
                templateUrl: 'app/components/main/patientinformationviews/patientinformation.html',
                // controller: 'patientInformationController'
            })
            .state('patientinformation.introduction', {
                url: '/introduction',
                templateUrl: 'app/components/main/patientinformationviews/patientinformation.introduction.html'
            })
            .state('patientinformation.whychooseourpractice', {
                url: '/whychooseourpractice',
                templateUrl: 'app/components/main/patientinformationviews/patientinformation.whychooseourpractice.html'
            })
            .state('patientinformation.patientregistration', {
                url: '/patientregistration',
                templateUrl: 'app/components/main/patientinformationviews/patientinformation.patientregistration.html'
            })
            .state('patientinformation.paymentandinsurance', {
                url: '/paymentandinsurance',
                templateUrl: 'app/components/main/patientinformationviews/patientinformation.paymentandinsurance.html'
            })

        // about orthodontics routes and subviews
        .state('aboutorthodontics', {
                url: '/aboutorthodontics',
                templateUrl: 'app/components/main/aboutorthodonticsviews/aboutorthodontics.html',
                // controller: 'aboutOrthodonticsController'
            })
            .state('aboutorthodontics.orthodontictreatment', {
                url: '/orthodontictreatment',
                templateUrl: 'app/components/main/aboutorthodonticsviews/aboutorthodontics.orthodontictreatment.html'
            })
            .state('aboutorthodontics.childrenandbraces', {
                url: '/childrenandbraces',
                templateUrl: 'app/components/main/aboutorthodonticsviews/aboutorthodontics.childrenandbraces.html'
            })
            .state('aboutorthodontics.adultsandbraces', {
                url: '/adultsandbraces',
                templateUrl: 'app/components/main/aboutorthodonticsviews/aboutorthodontics.adultsandbraces.html'
            })

        // services routes and subviews
        .state('services', {
                url: '/services',
                templateUrl: 'app/components/main/servicesViews/services.html'
                    // controller: 'patientInformationController'
            })
            .state('services.braces', {
                url: '/braces',
                templateUrl: 'app/components/main/servicesViews/services.braces.html'
            })
            .state('services.clearbraces', {
                url: '/clearbraces',
                templateUrl: 'app/components/main/servicesViews/services.clearbraces.html'
            })
            .state('services.appliances', {
                url: '/appliances',
                templateUrl: 'app/components/main/servicesViews/services.appliances.html'
            })
            .state('services.invisalign', {
                url: '/invisalign',
                templateUrl: 'app/components/main/servicesViews/services.invisalign.html'
            })

        // meetus route
        .state('meetus', {
            url: '/meetus',
            templateUrl: 'app/components/main/meetus/meetus.html'
        })

        // account routes and subviews
        .state('account', {
                url: '/account',
                templateUrl: 'app/components/account/account.html'
            })
            .state('account.signin', {
                url: '/signin',
                templateUrl: 'app/components/account/account.signin.html',
                controller: 'signInCtrl',
                resolve: {
                    checkAuth: function($state, accountService) {
                        accountService.checkAuth()
                            .then(function(response) {
                                if (response === 'admin') {
                                    $state.go('account.doctordashboard');
                                }
                                if (response === 'user') {
                                    $state.go('account.patientdashboard');
                                }
                                if (response === 'unauthorized') {
                                    $state.go('account.signin');
                                }
                            });
                    }
                }
            })
            .state('account.patientdashboard', {
                url: '/dashboard/patient',
                templateUrl: 'app/components/account/patientDashboard/account.patientdashboard.html',
                controller: 'patientDashboardCtrl',
                resolve: {
                    checkAuth: function($state, accountService) {
                        accountService.checkAuth()
                            .then(function(response) {
                                if (response === 'admin') {
                                    $state.go('account.doctordashboard');
                                }
                                if (response === 'user') {
                                    $state.go('account.patientdashboard');
                                }
                                if (response === 'unauthorized') {
                                    $state.go('account.signin');
                                }
                            });
                    }
                }
            })
            .state('account.doctordashboard', {
                url: '/dashboard/doctor',
                templateUrl: 'app/components/account/doctorDashboard/account.doctordashboard.html',
                controller: 'doctorDashboardCtrl',
                resolve: {
                    checkAuth: function($state, accountService) {
                        accountService.checkAuth()
                            .then(function(response) {
                                if (response === 'admin') {
                                    $state.go('account.doctordashboard');
                                }
                                if (response === 'user') {
                                    $state.go('account.patientdashboard');
                                }
                                if (response === 'unauthorized') {
                                    $state.go('account.signin');
                                }
                            });
                    }
                }
            });

    });

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

        this.getSchedule = function(query) {
          return $http ({
            method: 'POST',
            url: '/schedule',
            data: query
          }).then(function(response) {
            return response;
          })
        }

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

angular.module('orthoApp')
    .controller('signInCtrl', function($scope, accountService, $state) {

        String.prototype.capitalizeFirstLetter = function() {
            return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
        };

        $scope.userLogin = function() {
            accountService.login({
                email: $scope.user.email,
                password: $scope.user.password
            })
                .then(function(response) {
                    $scope.user.password = null;
                    if (response.data.type === 'admin') {
                        $state.go('account.doctordashboard');
                    }
                    if (response.data.type === 'user') {
                      $state.go('account.patientdashboard');
                    }
                }).catch(function(error) {
                    console.log(error, 'user could not login signinctrl23');
                });
        };

        $scope.register = function(userInfo) {
            if ($scope.user.password !== $scope.user.confirmPassword) {
                //alert password don't match
                console.log('passwords do not match');
                return null;
            }
            if ($scope.user.email !== $scope.user.confirmEmail) {
                // show error box that says email does not match
                console.log('email does not match');
                return null;
            } else {
                var newUserInfo = {
                    name: {
                        firstname: $scope.user.name.firstname,
                        lastname: $scope.user.name.lastname
                    },
                    email: $scope.user.email,
                    password: $scope.user.password
                };
                var userLoginInfo = {
                    email: $scope.user.email,
                    password: $scope.user.password
                };
                accountService.register(newUserInfo)
                    .then(function(response) {
                        console.log(response.data);
                        accountService.login(userLoginInfo)
                            .then(function(response) {
                                $state.go('account.patientdashboard');
                            }).catch(function(error) {
                                console.log(error, 'user could not login signinctrl23');
                            });
                    });
            }
        };


        /***** signin jquery start *****/

        //declare variables

        var selectorButton = $('.selector-button');
        var signupField = $('.signup-field');
        var forgotPassword = $('.forgot-password');

        signupField.hide();

        // change selector button text color

        selectorButton.click(function() {
            $(this).addClass('active');
            $(this).removeClass('inactive');
            selectorButton.not($(this)).removeClass('active');
            selectorButton.not($(this)).addClass('inactive');
        });

        // animate form on sign in or sign up button click

        $('#signinbtn').click(function() {

            // animate underline

            $('.btn-underline-half').
            animate({
                marginLeft: '0'
            }, 800);

            //animate fields

            setTimeout(function() {
                $('.firstname-field').
                slideUp(500);
                $('.name-field').
                animate({
                    opacity: '0'
                }, 300);
            }, 200);
            setTimeout(function() {
                $('.lastname-field').
                slideUp(500);
                $('.lastname-field').
                animate({
                    opacity: '0'
                }, 300);
            }, 200);
            setTimeout(function() {
                $('.confirm-email-field').
                slideUp(500);
                $('.confirm-email-field').
                animate({
                    opacity: '0'
                }, 300);
            }, 200);
            setTimeout(function() {
                $('.confirm-field').
                slideUp(500);
                $('.confirm-field').
                animate({
                    opacity: '0'
                }, 300);
            }, 200);

            // show forgot password

            setTimeout(function() {
                forgotPassword
                    .animate({
                        opacity: '1'
                    }, 300)
                    .delay(250)
                    .slideDown(300);
            }, 100);
        });


        $('#signupbtn').click(function() {

            // animate underline

            $('.btn-underline-half').
            animate({
                marginLeft: '50%'
            }, 800);

            // hide forgot password

            forgotPassword.
            animate({
                    opacity: '0'
                }, 300)
                // .delay(250)
                .slideUp(300);

            // animate fields

            setTimeout(function() {
                $('.firstname-field')
                    .slideDown(500)
                    .css({
                        opacity: 1,
                        transition: 'opacity .30s'
                    });
            }, 600);
            setTimeout(function() {
                $('.lastname-field')
                    .slideDown(500)
                    .css({
                        opacity: 1,
                        transition: 'opacity .30s'
                    });
            }, 600);
            setTimeout(function() {
                $('.confirm-email-field')
                    .slideDown(500)
                    .css({
                        opacity: 1,
                        transition: 'opacity .30s'
                    });
            }, 600);
            setTimeout(function() {
                $('.confirm-field')
                    .slideDown(500)
                    .css({
                        opacity: 1,
                        transition: 'opacity .30s'
                    });
            }, 600);
        });

        // highlight underline of selected field
        $('.input').on('focus', function() {
            $(this).siblings('.underline').addClass('field-active');
        });
        $('.input').on('blur', function() {
            $(this).siblings('.underline').removeClass('field-active');
        });


    });

angular.module('orthoApp')
  .controller('mainCtrl', function($scope, mainService, $state) {

    $scope.sociallinks = mainService.sociallinks;
    $scope.homesectionlinks = mainService.homesectionlinks;
    $scope.patientinfosectionlinks = mainService.patientinfosectionlinks;
    $scope.aboutorthosectionlinks = mainService.aboutorthosectionlinks;
    $scope.servicessectionlinks = mainService.servicessectionlinks;

    // $scope.verifyAuth() {
    //
    // }

  });

angular.module('orthoApp')
  .service('mainService', function() {

    this.sociallinks = [
    {
      name: 'facebook',
      id: 'fb',
      path: './assets/img/icons/facebook.png',
      alt: 'facebook link'
    },
    {
      name: 'instagram',
      id: 'ig',
      path: './assets/img/icons/instagram.png',
      alt: 'instagram link'
    },
    {
      name: 'twitter',
      id: 'tt',
      path: './assets/img/icons/twitter.png',
      alt: 'twitter link'
    },
    {
      name: 'googleplus',
      id: 'gp',
      path: './assets/img/icons/googleplus.png',
      alt: 'google plus link'
    },
    {
      name: 'linkedin',
      id: 'li',
      path: './assets/img/icons/linkedin.png',
      alt: 'linked in link'
    }];

    this.homesectionlinks = [{
      title: 'New Patients',
      route: 'patientinformation.introduction'
    },
    {
      title: 'Patient Registration',
      route: 'patientinformation.patientregistration'
    }
    ];
    this.patientinfosectionlinks = [
      {
        title: 'Introduction',
        route: 'patientinformation.introduction'
      },
      {
        title: 'Why Choose Our Practice',
        route: 'patientinformation.whychooseourpractice'
      },
      {
        title: 'Patient Registration',
        route: 'patientinformation.patientregistration'
      },
      {
        title: 'Payment and Insurance',
        route: 'patientinformation.paymentandinsurance'
      }
    ];
    this.aboutorthosectionlinks = [
      {
        title: 'Orthodontic Treatment',
        route: 'aboutorthodontics.orthodontictreatment'
      },
      {
        title: 'Children and Braces',
        route: 'aboutorthodontics.childrenandbraces'
      },
      {
        title: 'Adults and Braces',
        route: 'aboutorthodontics.adultsandbraces'
      }
    ];
    this.servicessectionlinks = [
      {
        title: 'Traditional Braces',
        route: 'services.braces'
      },
      {
        title: 'Clear Braces',
        route: 'services.clearbraces'
      },
      {
        title: 'Invisalign',
        route: 'services.invisalign'
      }
    ];


  });

angular.module('orthoApp')
  .directive('footerdir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'app/shared/footer/footerdir.html'
    };
    
  });

angular.module('orthoApp')
    .directive('navbardir', function() {

        return {
            restrict: 'AE',
            templateUrl: 'app/shared/navbar/navbardir.html',
            controller: function($scope, $state, accountService, $rootScope) {

                if ($state.current.name === 'account.patientdashboard' || $state.current.name === 'account.doctordashboard') {
                    $scope.showLogout = true;
                }
                if ($state.current.name !== 'account.patientdashboard' && $state.current.name !== 'account.doctordashboard') {
                    $scope.showLogout = false;
                }

                $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
                  if(fromState.name === 'account.signin') {
                    $scope.showLogout = true;
                  }
                });

                $scope.logout = function() {
                    accountService.logout()
                        .then(function(response) {
                            $scope.showLogout = false;
                            $state.go('account.signin');
                        })
                };

                $scope.menuBool = false;
                $scope.menuToggle = function() {
                    if ($scope.menuBool === false) {
                        return $scope.menuBool = true;
                    }
                    if ($scope.menuBool === true) {
                        return $scope.menuBool = false;
                    }
                };
            },
            link: function(scope, elements, attributes) {

                var mobileMenu = $('.mobile-menu');
                var menuLink = $('.mobile-menu-link');
                var subLink = $('.mobile-menu-sublink-list');
                var main = $('.main');

                mobileMenu.hide();
                subLink.hide();

                $('.mobile-menu-button').click(function() {
                    mobileMenu.toggle('slide');
                    $('.mobile-call-button').toggleClass('hidden');
                });

                main.click(function() {
                    mobileMenu.hide('slide');
                    if ($('.mobile-call-button').hasClass('hidden')) {
                        $('.mobile-call-button').removeClass('hidden');
                    }
                });

                menuLink.click(function() {
                    $(this).siblings('.mobile-menu-sublink-list').slideToggle();
                    $(this).children().children('.list-arrow').toggleClass('list-arrow-toggle');
                    subLink.not($(this).siblings()).slideUp();
                    $('.list-arrow').not($(this).children('div').children('.list-arrow')).removeClass('list-arrow-toggle');
                });

                subLink.click(function() {
                    $('body').removeClass('fixed');
                    mobileMenu.toggle('slide');
                    $(this).slideToggle();
                    $('.list-arrow').removeClass('list-arrow-toggle');
                });
            }
        };
    });

angular.module('orthoApp')
  .directive('dbDrHomeDir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'app/components/account/doctorDashboard/dbDrHome.html',
      controller: function() {
        
      }
    };

  });

angular.module('orthoApp')
  .directive('dbDrPatientDir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'app/components/account/doctorDashboard/dbDrPatient.html'
    };
    
  });

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

angular.module('orthoApp')
    .directive('dbMainDir', function(accountService) {

        return {
            restrict: 'AE',
            templateUrl: 'app/components/account/patientdashboard/dbMainDir.html',
            // controller:
            link: function($scope) {

                /*** Chart JS ***/
                accountService.getCurrentUser()
                    .then(function(response) {
                        var treatmentTime = response.data.ett;
                        var daysLeft = treatmentTime;
                        var daysPassed = 0;

                        Chart.defaults.global.title.display = true;
                        Chart.defaults.global.title.text = 'Estimated Treatment Time';
                        Chart.defaults.global.title.fontColor = 'white';
                        Chart.defaults.global.title.fontSize = 16;
                        Chart.defaults.global.title.position = 'bottom';
                        Chart.defaults.global.defaultFontColor = 'white';
                        Chart.defaults.global.defaultFontFamily = 'sans-serif';
                        Chart.defaults.global.defaultFontSize = 14;

                        var ctx = $('#ett-graph');
                        var ettChart = new Chart(ctx, {
                            type: 'doughnut',
                            data: {
                                labels: ["Days Left", "Days Passed"],
                                datasets: [{
                                    label: 'days',
                                    data: [daysLeft, daysPassed],
                                    backgroundColor: ['#98de25', '#A8C9DE'],
                                    borderWidth: '10px',
                                    borderColor: ['#98de25', '#A8C9DE']
                                }]
                            },
                            options: {
                                defaultFontColor: 'white',
                                cutoutPercentage: 60
                            }
                        });

                        setTimeout(function() {
                            var updateChart = setInterval(function() {
                                if (daysPassed >= treatmentTime) {
                                    clearInterval(updateChart);
                                } else {
                                    ettChart.data.datasets[0].data[0] -= 1;
                                    daysLeft -= 1;
                                    ettChart.data.datasets[0].data[1] += 1;
                                    daysPassed += 1;
                                    ettChart.update();
                                }
                            }, 200);
                        }, 1000);
                    });

            }
        };

    });

angular.module('orthoApp')
  .directive('dbPaymentDir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'app/components/account/patientdashboard/dbPaymentDir.html',

    };

  });

angular.module('orthoApp')
  .directive('dbSettingsDir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'app/components/account/patientdashboard/dbSettingsDir.html'
    };

  });

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

angular.module('orthoApp')
    .controller('homeCtrl', function($scope, mainService, $state) {

        function initMap() {
            var lyman = {
                lat: 41.32,
                lng: -110.29
            };
            var map = new google.maps.Map(document.getElementById('map'), {
                center: lyman,
                scrollwheel: false,
                zoom: 7
            });
            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map
            });

            // HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    var request = {
                        destination: lyman,
                        origin: pos,
                        travelMode: google.maps.TravelMode.DRIVING
                    };
                    // Pass the directions request to the directions service.
                    var directionsService = new google.maps.DirectionsService();
                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            // Display the route on the map.
                            directionsDisplay.setDirections(response);
                        }
                    });
                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        }
        initMap();

    });
