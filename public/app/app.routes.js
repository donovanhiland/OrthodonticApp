angular.module('orthoApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/main/homeTmpl.html'
      })
      .state('patientinformation', {
        url: '/patientinformation',
        templateUrl: 'app/components/main/patientInformation.html'
      })
      .state('aboutOrthodontics', {
        url: '/aboutorthodontics',
        templateUrl: 'app/components/main/aboutOrthodontics.html'
      })
      .state('services', {
        url: '/services',
        templateUrl: 'app/components/main/services.html'
      })
      .state('meetus', {
        url: '/meetus',
        templateUrl: 'app/components/main/meetus.html'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/components/main/register.html'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/components/main/signin.html'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/components/dashboard/dashboardTmpl.html',
      });

  });
