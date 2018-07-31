$(function() {
  // Toggle menu
  $("#top-menu__toggle-btn").on("click", function() {
    $(".top-menu__wrapper").slideToggle(300, function() {
      if ($(this).attr("style") === "display: none;") {
        $(this).removeAttr("style");
      }
    });
  });

  // Smooth scroll animation function
  function animateScrollTo(el) {
    $("html, body").animate(
      {
        scrollTop: $(el).offset().top
      },
      1000
    );
  }

  // Add smooth scroll to page
  $(".scroll-btn").each(function() {
    $(this).on("click", function(e) {
      e.preventDefault();

      var scrollToElement = $(this).data("to");

      if (scrollToElement) {
        animateScrollTo(scrollToElement);
      } else {
        animateScrollTo($(this).attr("href"));
      }
    });
  });

  // MixItUp js
  $(".features-list__wrapper").mixItUp({
    controls: {
      activeClass: "features-controls__item-active"
    },
    load: {
      filter: ".mix-category__all"
    }
  });

  // Modal gallery for features
  $("#gallery .features-gallery").magnificPopup({
    gallery: {
      enabled: true
    },
    type: "image",
    removalDelay: 300,
    mainClass: "mfp-fade"
  });
});
