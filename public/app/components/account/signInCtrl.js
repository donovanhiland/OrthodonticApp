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
        $('.firstname-field').
          slideUp('slow');
        $('.name-field').
          animate({opacity: '0'}, 400);
      }, 200);
      setTimeout(function() {
        $('.lastname-field').
          slideUp('slow');
        $('.lastname-field').
          animate({opacity: '0'}, 400);
      }, 800);
      setTimeout(function() {
        $('.confirm-email-field').
        slideUp('slow');
        $('.confirm-email-field').
        animate({opacity: '0'}, 400);
      }, 1400);
      setTimeout(function() {
        $('.confirm-field').
          slideUp('slow');
        $('.confirm-field').
          animate({opacity: '0'}, 400);
      }, 2000);

      // show forgot password

      setTimeout(function() {
        forgotPassword.
          animate({opacity: '1'}, 400).
          delay(250).
          slideDown();
      }, 2100);
    });


    $('#signupbtn').click(function() {

      // animate underline

      $('.btn-underline-half').
        animate({marginLeft: '50%'}, 800);

      // change submit button text

      $('.sign-btn').html('SIGN UP');

      // hide forgot password

      forgotPassword.
        animate({opacity: '0'}, 400).
        delay(250).
        slideUp();

      // animate fields

      setTimeout(function() {
        $('.firstname-field').
          slideDown('slow');
        $('.firstname-field').
          animate({opacity: '1'}, 400);
      }, 1100);
      setTimeout(function() {
        $('.lastname-field').
          slideDown('slow');
        $('.lastname-field').
          animate({opacity: '1'}, 400);
      }, 1600);
      setTimeout(function() {
        $('.confirm-email-field').
          slideDown('slow');
        $('.confirm-email-field').
          animate({opacity: '1'}, 400);
      }, 2100);
      setTimeout(function() {
        $('.confirm-field').
          slideDown('slow');
        $('.confirm-field').
          animate({opacity: '1'}, 400);
      }, 2600);
    });

    // highlight underline of selected field
    $('.input').on('focus', function() {
      $(this).siblings('.underline').addClass('field-active');
    });
    $('.input').on('blur', function() {
      $(this).siblings('.underline').removeClass('field-active');
    });


  });
