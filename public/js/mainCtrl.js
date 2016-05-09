angular.module('orthoApp')
  .controller('mainCtrl', function($scope, mainService) {

    $scope.sociallinks = [
    {
      name: 'facebook',
      id: 'fb',
      path: './img/icons/facebook.png',
      alt: 'facebook link'
    },
    {
      name: 'instagram',
      id: 'ig',
      path: './img/icons/instagram.png',
      alt: 'instagram link'
    },
    {
      name: 'twitter',
      id: 'tt',
      path: './img/icons/twitter.png',
      alt: 'twitter link'
    },
    {
      name: 'googleplus',
      id: 'gp',
      path: './img/icons/googleplus.png',
      alt: 'google plus link'
    },
    {
      name: 'linkedin',
      id: 'li',
      path: './img/icons/linkedin.png',
      alt: 'linked in link'
    }];

    $scope.homesectionlinks = ['New Patients', 'Patient Testimonials', 'Patient Registration', 'Contact Us'];

  });
