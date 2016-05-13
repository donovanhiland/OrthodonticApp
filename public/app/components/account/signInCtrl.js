angular.module('orthoApp')
  .controller('signInCtrl', function($scope, signInService) {


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

      // change submit button text

      $('.sign-btn').html('SIGN IN');

      //animate fields

      setTimeout(function() {
        $('.name-field').
          slideUp('slow');
        $('.name-field').
          animate({opacity: '0'}, 500);
      }, 200);
      setTimeout(function() {
        $('.confirm-field').
          slideUp('slow');
        $('.confirm-field').
          animate({opacity: '0'}, 500);
      }, 800);

      // show forgot password

      setTimeout(function() {
        forgotPassword.
          animate({opacity: '1'}, 500).
          delay(250).
          slideDown();
      }, 900);
    });

    $('#signupbtn').click(function() {

      // animate underline

      $('.btn-underline-half').
        animate({marginLeft: '50%'}, 800);

      // change submit button text

      $('.sign-btn').html('SIGN UP');

      // hide forgot password

      forgotPassword.
        animate({opacity: '0'}, 500).
        delay(250).
        slideUp();

      // animate fields

      setTimeout(function() {
        $('.name-field').
          slideDown('slow');
        $('.name-field').
          animate({opacity: '1'}, 500);
      }, 1300);
      setTimeout(function() {
        $('.confirm-field').
          slideDown('slow');
        $('.confirm-field').
          animate({opacity: '1'}, 500);
      }, 1800);
    });

    // highlight underline of selected field
    $('.input').on('focus', function() {
      $(this).siblings('.underline').addClass('field-active');
    });
    $('.input').on('blur', function() {
      $(this).siblings('.underline').removeClass('field-active');
    });


  });
