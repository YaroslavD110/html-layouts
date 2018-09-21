$(document).ready(function() {
  // Video popup
  $(".video-btn").modalVideo();

  // Samples carousel
  $("#samples-carousel").owlCarousel({
    items: 3,
    loop: true,
    dots: false,
    center: true,
    margin: 50,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
        center: false,
        dots: true
      },
      615: {
        items: 1,
        nav: true,
        center: false,
        dots: true
      },
      768: {
        items: 2,
        nav: true,
        center: false
      },
      1150: {
        items: 3,
        nav: true
      }
    }
  });

  // Smooth scroll to id
  $(".scroll-btn").on("click", function(e) {
    e.preventDefault();

    $("html, body").animate(
      { scrollTop: $($(this).attr("href")).offset().top },
      800,
      "linear"
    );
  });

  // Toggle menu
  $(".header-panel__menu-btn").on("click", toggleMenu);
  $(".header-panel__menu-link").on("click", toggleMenu);

  function toggleMenu() {
    $(".header-panel__menu-btn").toggleClass("header-panel__menu-btn__opened");
    $(".header-panel__menu").slideToggle(300, function() {
      if ($(this).attr("style") === "display: none;") {
        $(this).removeAttr("style");
      }
    });
  }

  // Hover efect
  $(".process-collection__item").on("mouseover", function() {
    $(".process-collection__item")
      .parent()
      .removeClass("process-collection__item-active");
    $(this)
      .parent()
      .addClass("process-collection__item-active");
  });

  $(".process-collection__item").on("mouseleave", function() {
    $(this)
      .parent()
      .removeClass("process-collection__item-active");
  });
});
