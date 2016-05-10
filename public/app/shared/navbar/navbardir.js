angular.module('orthoApp')
  .directive('navbardir', function() {

    return {
      restrict: 'AE',
      templateUrl: 'app/shared/navbar/navbardir.html',
      controller: function($scope, $state) {

        $scope.menuBool = false;
        $scope.menuToggle = function() {
          if($scope.menuBool === false) {
            return $scope.menuBool = true;
          }
          if($scope.menuBool === true) {
            return $scope.menuBool = false;
          }
        };

        $(document).ready(function() {

          var mobileMenu = $('.mobile-menu');
          var menuLink = $('.mobile-menu-link');
          var subLink = $('.mobile-menu-sublink-list');

          mobileMenu.hide();
          subLink.hide();

          $('.mobile-menu-button').click(function() {
            mobileMenu.toggle('slide');
            $('body').toggleClass('fixed');
            $('.mobile-call-button').toggleClass('hidden');
          });

          menuLink.click(function() {
            $(this).siblings('.mobile-menu-sublink-list').slideToggle();
            $(this).children().children('#list-arrow').toggleClass('list-arrow-toggle');
          });

        });


      }
    };



  });
