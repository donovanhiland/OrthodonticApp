angular.module('orthoApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    // home route
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/main/home/homeTmpl.html',
        controller: 'homeCtrl'
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
        controller: 'signInCtrl'
      })
      .state('account.patientdashboard', {
        url: '/dashboard/patient',
        templateUrl: 'app/components/account/patientDashboard/account.patientdashboard.html',
        controller: 'dashboardCtrl',
      })
      .state('account.doctordashboard', {
        url: '/dashboard/doctor',
        templateUrl: 'app/components/account/doctorDashboard/account.doctordashboard.html',
        controller: 'dashboardCtrl',
      });

  });
