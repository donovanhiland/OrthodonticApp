angular.module('orthoApp')
  .controller('mainCtrl', function($scope, mainService) {

    $scope.sociallinks = [
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

    $scope.homesectionlinks = ['New Patients', 'Patient Testimonials', 'Patient Registration', 'Contact Us'];

  });
