;$(document).ready(function() {

	// Menu toggle
	$('.hidden-menu .menu-btn').click(function() {
		$('menu .main-menu').slideToggle(600, function() {

			if( $(this).css('display') === 'none' ) {
				$(this).removeAttr('style');
			}

		});
	});

	// Scrollling function
	$("menu ul li a").mPageScroll2id({
		offset: 0
	});

	$(".header-btn a").mPageScroll2id({
		offset: 0
	});

	// "About us" section animation

	$(window).scroll(function() {

		var headerHeight = $('header').height(),
			windowScrollTop = $(window).scrollTop(),
			blockScrollTop = (windowScrollTop - headerHeight) * -1;

		if( blockScrollTop < 200 ) {
			startAnimation();
		}
	});

});

function startAnimation() {

	$('.about-us').addClass('animation-active');

	// Timeouts
	setTimeout(endAnimation, 3.4 * 1000, $('.circle-2011'), $('.card-2011'));
	setTimeout(endAnimation, 4.5 * 1000, $('.circle-2012'), $('.card-2012'));
	setTimeout(endAnimation, 6.9 * 1000, $('.circle-2013'), $('.card-2013'));
	setTimeout(endAnimation, 8.9 * 1000, $('.circle-2014'), $('.card-2014'));
	setTimeout(lineHeight, 10.9 * 1000, $('.buildings-box .line'));
};

function endAnimation( circle, card ) {

	circle.css('transform', 'scale(1)');
	card.css('opacity', 1);

};

function lineHeight( el ) {
	el.css('height', '50px');
};
