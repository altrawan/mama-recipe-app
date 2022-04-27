import $ from 'jquery';

$(document).ready(function () {
  /* --------------------- Navbar Shrink --------------------- */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 90) {
      $('.navbar').addClass('navbar-shrink');
    } else {
      $('.navbar').removeClass('navbar-shrink');
    }
  });
});
