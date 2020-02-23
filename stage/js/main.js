/*global $, alert, console */

$(function (){
  'use strict';


  // Load Page Donn't Reload 
  $('.link-page').on('click', function () {

    $('#show-home-page').load($(this).data('page'));

  });

  // Navbar Add Class Active 
  $('.nav-item').on('click', function () {

    $(this).addClass('active').siblings().removeClass('active');

  });


  // Toogle Show Navbar 
  $('.navbar-collapse .collapse-toggle').on('click', function () {

    if ($(window).width() < 992) {
    $('.navbar-collapse').collapse('toggle');
    }

  });


});

// Start Login Page 
$(window).on("load",function() {

  $('.loading-page').remove();
  $('body').css('overflow', 'auto');

});