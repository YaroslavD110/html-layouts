$(document).ready(function() {

	if ( $(window).width() < 880 ) {
		$("#menu").addClass("mmenu-active");
		startMMenu();
	}

	$(window).on("resize", function() {
		if ( $(window).width() < 880 ) {
			$("#menu").addClass("mmenu-active");
			startMMenu();
		} else {
			$("#menu").removeClass("mmenu-active");
			//$(".top-panel").append('<div id="menu"><ul><li><a href="#">HOME</a></li><li><a href="#">ABOUT</a></li><li><a href="#">SERVICES</a></li><li><a href="#">PORTFOLIO</a></li><li><a href="#">TESTIMONIALS</a></li><li><a href="#">CONTACT</a></li></ul></div>');
		}
	});

	function startMMenu () {

		$(".mmenu-active").mmenu({
			"offCanvas": {
	            "position": "right"
	         },

	         "extensions": [
	            "fx-menu-slide",
	            "pagedim-black",
	            "shadow-panels",
	            "theme-dark"
	         ]
		});

	}

	$("#my-button").click(function() {
		$(".mmenu-active").data("mmenu").open();
	});

	/* OwlCarousel */
	$(".owl-carousel").owlCarousel({
		items: 4,
		loop: true,
		autoWidth: true,
		dotsEach: false,

		responsive: {
			0: {
				items: 1,
			},

			730: {
				items: 1
			},

			1200: {
				items: 4,
				center: true
			}
		}
	});

	$(".clients-test-carousel").owlCarousel({
		items: 1,
		loop: true,
		autoWidth: true,
		dotsEach: false
	});

	/* Scroll to id */

	$("#menu ul li a").mPageScroll2id({
		offset: 0
	});

	$(".scroll-down-btn a").mPageScroll2id({
		offset: 100
	});

	/* Magnific popup */
	$('.img-link').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});
});	