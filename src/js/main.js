const $body = $("body");
const $window = $(window);
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let mobileMode = $window.width() < 800;
let mobileListener;

// Function for creating tabs
function tabs({ $controls, $content, $scene }) {
  $content.slideUp(0);
  $controls.removeClass("active-control");
  $scene.empty();
  $controls.each((index, btn) => {
    if (index === 0 && !mobileMode) {
      $(btn).addClass("active-control");

      $($content.get(0))
        .clone()
        .appendTo($scene)
        .removeAttr("style");
    }

    $(btn)
      .unbind("click")
      .click(function() {
        if (mobileMode) {
          const $current = $($content.get(index));

          if ($current.css("display") === "none") {
            $(this).addClass("active-control");
            $current.slideDown(300);
          } else {
            $current.slideUp(300);
            $(this).removeClass("active-control");
          }
        } else {
          $controls.removeClass("active-control");
          $(this).addClass("active-control");
          $scene.children().fadeOut(300, function() {
            $(this).remove();

            $($content.get(index))
              .clone()
              .appendTo($scene)
              .fadeIn(300);
          });
        }
      });
  });
}

// Smooth scroll to section
$(document).on("click", "a[href^=\"#\"]", function(event) {
  event.preventDefault();

  $(".navbar-btn__active").removeClass("navbar-btn__active");
  $(".navbar-wrap__active").removeClass("navbar-wrap__active");
  $body.css("overflow", "auto");

  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top
    },
    500
  );
});

// Fix mobile menuon resize
$(window).on("resize", function() {
  if ($(this).width() > 991 && $body.css("overflow") === "hidden") {
    $body.css("overflow", "auto");
  }
});

$(document).ready(function() {
  // Init slick slider for responses
  $(".responses-wrap").slick({
    slidesToShow: 3,
    infinite: false,
    prevArrow:
      "<button class=\"responses-btn__prev\"><img src=\"img/slider-arrow-icon.svg\" /></button>",
    nextArrow:
      "<button class=\"responses-btn__next\"><img src=\"img/slider-arrow-icon.svg\" /></button>",
    dotsClass: "responses-dots",
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 900,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 1
        }
      }
    ]
  });

  // Form validation
  $("form").on("submit", function(e) {
    e.preventDefault();

    const $this = $(this);
    const values = $this.serializeArray();
    const rules = {
      name(value) {
        if (!value || !value.length) {
          return "Name is required!";
        }

        return undefined;
      },
      email(value) {
        if (!value) {
          return "Email is required!";
        }
        if (!value || !emailRegExp.test(value)) {
          return "Email is invalid!";
        }

        return undefined;
      },
      phone(value) {
        if (value && value.length < 10) {
          return "Phone is invalid!";
        }

        return undefined;
      },
      message(value) {
        if (!value) {
          return "Message is required!";
        }
        if (value.length < 20) {
          return "Message must have at least 20 characters!";
        }

        return undefined;
      }
    };

    values.forEach((input) => {
      const $input = $this.find(`input[name=${input.name}], textarea[name=${input.name}]`);
      const $group = $input.parent(".contacts-form__group");
      const $label = $group.find(".error-label");
      const validationResult = rules[input.name] && rules[input.name](input.value);

      if (typeof validationResult === "string") {
        $group.addClass("error");
        $group.find(".error-label").text(validationResult);
      }

      $input.on("keypress", (event) => {
        const validation = rules[input.name] && rules[input.name](event.target.value);

        if (typeof validation === "string") {
          $group.addClass("error");
          $label.text(validation);
        } else {
          $group.removeClass("error");
          $label.text("");
        }
      });
    });

    console.log("Form values: ", $(this).serializeArray());
  });

  // Mobile menu
  $(".navbar-btn").click(function() {
    $(this)
      .toggleClass("navbar-btn__active")
      .next(".navbar-wrap")
      .toggleClass("navbar-wrap__active");

    if ($body.css("overflow") === "hidden") {
      $body.css("overflow", "auto");
    } else {
      $body.css("overflow", "hidden");
    }
  });

  // Map interactive
  $(".projects-map .projects-overlay").click(function() {
    $(this).css("opacity", "0");
    setTimeout(() => $(this).css("display", "none"), 300);
  });

  mobileListener = () => {
    // Create tabs for about section
    tabs({
      $controls: $(".about-tabs__item-control"),
      $content: $(".about-tabs__item-content"),
      $scene: $(".about-tabs__scene")
    });

    // Create tabs for services section
    tabs({
      $controls: $(".services-tabs__item-control"),
      $content: $(".services-tabs__item-content"),
      $scene: $(".services-tabs__scene")
    });

    // Product animation
    let currentProductIndex = 0;
    const $productItems = $(".product-layer");
    const $productControls = $(".product-controls__item");
    const $sliderBtns = $(".product-description__btns .product-description__btn");
    const $descriptionItems = $(".product-description__list .product-description__list-item");
    const $frontSide = $productItems.filter(function() {
      return /([7-9])|(1[0-2])/.test($(this).data("id"));
    });

    const getById = ($list, id) => $list.filter(function() {
      return $(this).data("id") === id;
    });

    const getIdByIndex = index => $descriptionItems.get(index) && $descriptionItems.get(index).dataset.id;

    const resetProduct = () => {
      $productItems.removeClass("product-layer__active");
      $productItems.attr("opacity", 1);
      $productControls.removeClass("product-controls__item-active");
      $descriptionItems.removeClass("active");
      getById($descriptionItems, 0).addClass("active");
    };

    const setActiveLayer = (id) => {
      if (id < 8) {
        $frontSide.attr("opacity", 0);
      } else {
        $frontSide.attr("opacity", 1);
      }

      if (id === 0) {
        resetProduct();
      }

      if (id === 8) {
        getById($productItems, 13).attr("opacity", 0);
      } else {
        getById($productItems, 13).attr("opacity", 1);
      }

      $productItems.removeClass("product-layer__active");
      $(`.product-layer[data-id=${id}], .product-layer[data-connect=${id}]`).addClass(
        "product-layer__active"
      );
    };

    const setCurrentProduct = (id) => {
      setActiveLayer(id);

      $productControls.removeClass("product-controls__item-active");
      getById($productControls, id).addClass("product-controls__item-active");

      $descriptionItems.removeClass("active");
      getById($descriptionItems, id).addClass("active");
    };

    const $productDescWrap = $(".product-description__list");
    if (mobileMode) {
      $(".product-controls").attr("opacity", 0);
      $productDescWrap.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        dotsClass: "product-dots",
        adaptiveHeight: true
      });

      $productDescWrap.on("afterChange", function(event) {
        const $target = $(event.currentTarget).find(".slick-active");
        const id = $target.data("id");

        setActiveLayer(id);
      });
    } else {
      $(".product-controls").attr("opacity", 1);
      if ($productDescWrap[0].slick) {
        $productDescWrap.slick("unslick");
      }
    }

    $productControls.find("rect").click((e) => {
      const $target = $(e.target).parent();
      const id = $target.data("id");

      setCurrentProduct(id);
    });

    $sliderBtns.click(function() {
      const itemsCount = $descriptionItems.length - 2;
      let id = 0;

      if ($(this).hasClass("product-description__btn-prev")) {
        currentProductIndex--;

        if (currentProductIndex < 0) {
          currentProductIndex = itemsCount;
        }

        id = parseInt(getIdByIndex(currentProductIndex), 10);
      } else if ($(this).hasClass("product-description__btn-next")) {
        currentProductIndex++;

        if (currentProductIndex > itemsCount) {
          currentProductIndex = 0;
        }

        id = parseInt(getIdByIndex(currentProductIndex), 10);
      }

      setCurrentProduct(id);
    });

    getById($descriptionItems, 0).addClass("active");
    $("#product-reset").click(function() {
      resetProduct();
    });
  };

  // Animation on scroll
  $(".anim").viewportChecker({
    classToAdd: "anim-action",
    repeat: false,
    invertBottomOffset: true,
    callbackFunction($elem, action) {
      if (action === "add") {
        const delay = $elem.data("delay");

        if (delay) {
          $elem.removeClass("anim-action");
          setTimeout(() => {
            $elem.addClass("anim-action");
          }, delay);
        }
      }

      return $elem;
    }
  });

  // Handle mobile mode
  mobileListener();
  $window.resize(function() {
    const tmpState = $(this).width() < 800;

    if (tmpState !== mobileMode) {
      if (tmpState) {
        mobileMode = true;
      } else {
        mobileMode = false;
      }

      mobileListener();
    }
  });
});

// Create Google Map
// const googleMapStyles = [
//   {
//     featureType: "administrative",
//     elementType: "labels",
//     stylers: [
//       {
//         visibility: "off"
//       }
//     ]
//   },
//   {
//     featureType: "administrative",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#444444"
//       }
//     ]
//   },
//   {
//     featureType: "landscape",
//     elementType: "all",
//     stylers: [
//       {
//         color: "#f2f2f2"
//       }
//     ]
//   },
//   {
//     featureType: "poi",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "off"
//       }
//     ]
//   },
//   {
//     featureType: "road",
//     elementType: "all",
//     stylers: [
//       {
//         saturation: -100
//       },
//       {
//         lightness: 45
//       }
//     ]
//   },
//   {
//     featureType: "road.highway",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "simplified"
//       }
//     ]
//   },
//   {
//     featureType: "road.arterial",
//     elementType: "labels.icon",
//     stylers: [
//       {
//         visibility: "off"
//       }
//     ]
//   },
//   {
//     featureType: "transit",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "off"
//       }
//     ]
//   },
//   {
//     featureType: "water",
//     elementType: "all",
//     stylers: [
//       {
//         color: "#d5e6ec"
//       },
//       {
//         visibility: "on"
//       }
//     ]
//   }
// ];

// const infoWindowContent = `
//   <div class="projects-window">
//     <img src="img/response-1.jpg" alt="Window" class="projects-window__preview" />
//     <div class="projects-window__details">
//       <h3 class="projects-window__details-subtitle">Медичний центр</h3>
//       <h1 class="projects-window__details-title">Euro Clinic</h1>

//       <div class="projects-window__details-item">
//         <img src="img/location-icon.svg" alt="Icon" class="projects-window__details-icon" />
//         м. Львів 79059, вул. І. Миколайчука, 9
//       </div>

//       <div class="projects-window__details-item">
//         <img src="img/phone-icon.svg" alt="Icon" class="projects-window__details-icon" />
//         <a href="tel:0322 937 111">0322 937 111</a>
//       </div>

//       <div class="projects-window__details-item">
//         <img src="img/network-icon.svg" alt="Icon" class="projects-window__details-icon" />
//         <a href="lviv.euroclinic.com.ua">lviv.euroclinic.com.ua</a>
//       </div>
//     </div>
//   </div>
// `;

// const getPlaceInfo = placeId => new Promise((resolve, reject) => {
//   fetch(
//     `https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=${googleMapsAPIKey}`
//   )
//     .then(res => res.json())
//     .then((res) => {
//       console.log("Response from places API: ", res);
//       resolve(res);
//     })
//     .catch(error => reject(error));
// });

// function initMap() {
//   const Maps = window.google.maps;
//   const mapNode = document.getElementById("projects-map");
//   const clinics = [
//     { lat: 47.65283, lng: 23.5630113 },
//     { lat: 48.7011097, lng: 16.3237555 },
//     { lat: 49.0072688, lng: 17.5394927 },
//     { lat: 48.2697747, lng: 17.7017145 }
//   ];

//   if (mapNode) {
//     const map = new Maps.Map(mapNode, {
//       center: { lat: 48.9694599, lng: 32.7080557 },
//       zoom: 5,
//       styles: googleMapStyles
//     });

//     clinics.forEach((clinicPosition) => {
//       const infoWindow = new Maps.InfoWindow({
//         content: infoWindowContent,
//         maxWidth: 360
//       });

//       const marker = new Maps.Marker({
//         position: clinicPosition,
//         icon: "../img/map-label.svg",
//         map
//       });

//       marker.addListener("click", () => {
//         infoWindow.open(map, marker);
//       });
//     });
//   }
// }
