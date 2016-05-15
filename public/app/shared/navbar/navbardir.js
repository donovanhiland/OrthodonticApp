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

      },
      link: function(scope, elements, attributes) {

          var mobileMenu = $('.mobile-menu');
          var menuLink = $('.mobile-menu-link');
          var subLink = $('.mobile-menu-sublink-list');
          var main = $('.main');

          mobileMenu.hide();
          subLink.hide();

          // $scope.scrollLock = '{position: fixed}';

          $('.mobile-menu-button').click(function() {
            mobileMenu.toggle('slide');
            $('.mobile-call-button').toggleClass('hidden');
          });

          main.click(function() {
            mobileMenu.hide('slide');
            if($('.mobile-call-button').hasClass('hidden')) {
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
