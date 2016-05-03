angular.module('orthoApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'templates/mainTmpl.html'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'templates/dashboard/dashboardTmpl.html',
      });

  });
