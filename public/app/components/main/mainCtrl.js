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
