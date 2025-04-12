$(document).ready(function () {
  // Product Slider
  $(".slider").slick({
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  });

  // Parallax Hero
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    $(".hero-bg").css("transform", "translateY(" + scroll * 0.3 + "px)");
  });

  // Header Fade
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $("header").addClass("scrolled");
    } else {
      $("header").removeClass("scrolled");
    }
  });

  // Testimonial Animation
  $(".testimonial-card").each(function (i) {
    setTimeout(() => {
      $(this).addClass("show");
    }, i * 200);
  });

  // Form Validation
  $("#signupForm").submit(function (e) {
    const email = $("#emailInput").val();
    if (!email.includes("@")) {
      e.preventDefault();
      alert("Please enter a valid email.");
    } else {
      $(".signup-box").addClass("submitted");
      setTimeout(() => {
        $(".signup-box").removeClass("submitted");
      }, 1000);
    }
  });
});
