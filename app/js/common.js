;$(document).ready(function() {

	// Owl carousel
	$(".owl-carousel").owlCarousel({
		items: 1,
		nav: true,
		navText: [
			'<img src="img/carousel-arrow_left.png" alt="carousel-arrow_left" />',
			'<img src="img/carousel-arrow_right.png" alt="carousel-arrow_right" />'
		],
		loop: true
	});

	// Menu button
	$('header .menu-btn').click(function() {

		if( $(window).width() < 993 ) {
			closeMenu();
		}

	});

	$('header menu ul li').click(function() {
	
		if( $(window).width() < 993 ) {
			closeMenu();
		}
	
	});

	function closeMenu() {
		$('header menu').slideToggle(600, function(){

			if( $(this).attr('style') === 'display: none;' ) {
				$(this).removeAttr('style');
			}

		});

		$('header .menu-btn').toggleClass('rotate-btn');
	}
});
