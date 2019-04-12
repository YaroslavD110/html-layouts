const $body = $("body");
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const googleMapsAPIKey = "";

// Function for creating tabs
function tabs(nodes) {
  nodes.controls.each((index, btn) => {
    if (index === 0) {
      $(btn).addClass("active");
      $(nodes.content.get(0)).addClass("active");
    }

    $(btn).click(function() {
      $(nodes.controls).removeClass("active");
      $(this).addClass("active");

      $(nodes.content).removeClass("active");
      $(nodes.content.get(index)).addClass("active");
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
  // Create tabs for about section
  tabs({
    controls: $(".about-tabs__controls-item"),
    content: $(".about-tabs__content-item")
  });

  // Create tabs for services section
  tabs({
    controls: $(".services-tabs__controls-item"),
    content: $(".services-tabs__content-item")
  });

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

      $input.on("keypress", (e) => {
        const validation = rules[input.name] && rules[input.name](e.target.value);

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

  // Product animation
  const $productItems = $(".product-item__list > g");
  const $productControls = $(".product-item__text-list .product-item__text");
  const $productDescriptionItems = $(".product-description__list .product-description__list-item");
  const getID = (target) => {
    const className = target.classList.value.split(" ").find(value => /^group-[0-9]$/.test(value));

    if (className) {
      const id = className.substring(className.search(/[0-9]/));
      return parseInt(id, 10);
    }

    return undefined;
  };

  const setActiveItem = (activeItemId, control) => {
    if (typeof activeItemId !== "number") {
      $productItems.attr("opacity", 1);
      $productDescriptionItems.removeClass("active");
      $productDescriptionItems.filter("[data-id=0]").addClass("active");
    } else {
      $productItems.attr("opacity", 1);
      $productItems.not(`.group-${activeItemId}`).attr("opacity", 0.3);
      $productDescriptionItems.removeClass("active");
      $productDescriptionItems.filter(`[data-id=${activeItemId}]`).addClass("active");
    }

    if (!control) {
      $productControls.removeClass("active");
    } else {
      $productControls.removeClass("active");
      $(control).addClass("active");
    }
  };

  $productControls.find("rect").hover((e) => {
    const target = e.target.parentElement;
    const id = getID(target);
    setActiveItem(id, target);
  });

  $(".product-item__list").hover(() => {
    setActiveItem(null);
  });

  setActiveItem(null);

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
