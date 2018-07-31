;$(document).ready(function() {

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
		$('header menu ul').slideToggle(600, function(){

			if( $(this).attr('style') === 'display: none;' ) {
				$(this).removeAttr('style');
			}

		});

		$('header .menu-btn').toggleClass('rotate-btn');
	}

	// Scrollling function
	$('header menu ul li a').mPageScroll2id({
		offset: 50
	});

	// Left animation
	setWidth();

	$(window).on('resize', function() {
		setWidth();
	});

	function setWidth() {
		var boxWidth,
			bodyWidth = $(window).width(),
			contentWidth = $('#contentWidth').width();

		boxWidth = Math.round( (bodyWidth - contentWidth) / 2 );

		$('.animation-box').width(boxWidth + 'px');

		if( $(window).width() > 2300 ) {
			$('.animation-box').css('display', 'none');
		} else {
			$('.animation-box').css('display', 'block');
		}
	}
});
