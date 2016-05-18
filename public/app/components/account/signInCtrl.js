angular.module('orthoApp')
  .controller('signInCtrl', function($scope, signInService) {

    $scope.name = {
      firstname: $scope.firstname,
      lastname: $scope.lastname
    };
    $scope.name.lastname   = $scope.name.lastname;
    $scope.email           = $scope.email;
    $scope.confirmEmail    = $scope.confirmEmail;
    $scope.password        = $scope.password;
    $scope.confirmPassword = $scope.confirmPassword;

    $scope.userLogin = function() {

    };
    $scope.register = function() {

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
        animate({marginLeft: '0'}, 800);

      //animate fields

      setTimeout(function() {
        $('.firstname-field').
          slideUp(500);
        $('.name-field').
          animate({opacity: '0'}, 300);
      }, 200);
      setTimeout(function() {
        $('.lastname-field').
          slideUp(500);
        $('.lastname-field').
          animate({opacity: '0'}, 300);
      }, 200);
      setTimeout(function() {
        $('.confirm-email-field').
        slideUp(500);
        $('.confirm-email-field').
        animate({opacity: '0'}, 300);
      }, 200);
      setTimeout(function() {
        $('.confirm-field').
          slideUp(500);
        $('.confirm-field').
          animate({opacity: '0'}, 300);
      }, 200);

      // show forgot password

      setTimeout(function() {
        forgotPassword
          .animate({opacity: '1'}, 300)
          .delay(250)
          .slideDown(300);
      }, 100);
    });


    $('#signupbtn').click(function() {

      // animate underline

      $('.btn-underline-half').
        animate({marginLeft: '50%'}, 800);

      // hide forgot password

      forgotPassword.
        animate({opacity: '0'}, 300)
        // .delay(250)
        .slideUp(300);

      // animate fields

      setTimeout(function() {
        $('.firstname-field')
        .slideDown(500)
        .css({ opacity: 1, transition: 'opacity .30s' });
      }, 600);
      setTimeout(function() {
        $('.lastname-field')
        .slideDown(500)
        .css({ opacity: 1, transition: 'opacity .30s' });
      }, 600);
      setTimeout(function() {
        $('.confirm-email-field')
        .slideDown(500)
        .css({ opacity: 1, transition: 'opacity .30s' });
      }, 600);
      setTimeout(function() {
        $('.confirm-field')
        .slideDown(500)
        .css({ opacity: 1, transition: 'opacity .30s' });
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
