$(document).ready(function() {
	/* OwlCarousel */
	$('.comments-carousel').owlCarousel({
		items: 1,
		loop: true,
		autoWidth: true,
		dotsEach: false,
		responsive: {
			0: {
				items: 1,
				center: true
			},

			730: {
				items: 1,
				center: true
			},

			1200: {
				items: 1,
				center: true
			}
		}
	});

	/* MMenu */
	if ( $(window).width() < 1200 ) {
		$("menu").addClass("mmenu-active");
		startMMenu();
	}

	$(window).on("resize", function() {
		if ( $(window).width() < 1200 ) {
			$("menu").addClass("mmenu-active");
			startMMenu();
		} else {
			$("menu").removeClass("mmenu-active");
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
	            "shadow-panels"
	         ]
		});

	}

	$("#my-button").click(function() {
		$(".mmenu-active").data("mmenu").open();
	});

	/* ScrollToId */
	$("menu ul li a").mPageScroll2id({
		offset: 50
	});
});