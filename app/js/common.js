;$(document).ready(function() {

	// Fixed menu animation
	$(window).on('scroll', function(){

		if( $(window).width() > 768 ) {
			var logo = $('header .fixed_menu .logo .logo_box'),
				header = $('header .fixed_menu'),
				scrollTop = Math.round($(window).scrollTop());

			if( scrollTop >= 68 ) {
				header.addClass('fixed_anim');
			} else {
				header.removeClass('fixed_anim');
			}
		}

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

	// Menu scroll
	$("menu ul li a").mPageScroll2id({
		offset: 50
	});

	// WOW js
	new WOW().init();

	// JQuery validation
	$("#popup_form").validate({
		rules: {
			phone: {
				required: true,
			},

			email: {
				required: true,
				email: true,
			}
		},

		messages: {
			phone: {
				required: 'Введите ваш телефон',
			},

			email: {
				required: 'Введите вашу почту',
				email: 'Неправильная почта',
			}
		}
	});
});
