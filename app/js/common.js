;$(document).ready(function() {

	// Menu button
	// Header
	$('header .menu-btn').click(function() {
		if( $(window).width() < 769 ) {
			closeHeaderMenu();
		}
	});

	$('header menu ul li a').click(function() {
		if( $(window).width() < 769 ) {
			closeHeaderMenu();
		}
	});

	function closeHeaderMenu() {
		$('header menu ul').slideToggle(600, function(){

			if( $(this).attr('style') === 'display: none;' ) {
				$(this).removeAttr('style');
			}

		});

		$('header .menu-btn').toggleClass('rotate-btn');
	}

	// Footer
	$('footer .menu-btn').click(function() {
		closeFooterMenu();
	});

	$('footer menu ul li a').click(function() {
		closeFooterMenu();
	});

	function closeFooterMenu() {
		$('footer menu ul').slideToggle(600, function(){

			if( $(this).attr('style') === 'display: none;' ) {
				$(this).removeAttr('style');
			}

		});

		$('footer .menu-btn').toggleClass('rotate-btn');
	}

	// Popup window
	$('.popup-btn').click(function() {

		$('#popup .popup-header h2').html('Оставьте свой телефон и мы подберем оптимальный набор умных функций для Вашего дома, квартиры или офиса');
		$('#popup').slideDown(600);

	});

	$('.close-btn').click(function() {

		$('#popup').slideUp(600);

	});

	$('.popup-btn-works').click(function() {

		$('#popup .popup-header h2').html('Оставьте заявку и мы отправим вам ссылку на каталог');
		$('#popup').slideDown(600);

	});

	// Scrollling function
	$("menu ul li a").mPageScroll2id({
		offset: 0
	});

	$(".logo a").mPageScroll2id({
		offset: 0
	});

	// Scrolling animation
	var i = 0;

	(function($) {
		$.fn.animated = function(inEffect) {
			$(this).each(function() {
				var ths = $(this);
				ths.css("opacity", "0").addClass("animated").waypoint(function(dir) {
					if (dir === "down") {
						setTimeout(function(){
							ths.addClass(inEffect).css("opacity", "1");
						}, 500 * i);

						i++;
					};
				}, {
					offset: "90%"
				});

			});
		};
	})(jQuery);

	$('.step').animated('slideInDown');

	// Form validate
	$("#main-form").validate({
		rules: {
			name: {
				required: true,
			},

			phonenumber: {
				required: true,
				number: true,
			}
		},

		messages: {
			name: {
				required: 'Введите имя',
			},

			phonenumber: {
				required: 'Введите номер телефона',
				number: 'Неправильный номер телефона',
			}
		}
	});

	$("#popup-form").validate({
		rules: {
			name: {
				required: true,
			},

			phonenumber: {
				required: true,
				number: true,
			}
		},

		messages: {
			name: {
				required: 'Введите имя',
			},

			phonenumber: {
				required: 'Введите номер телефона',
				number: 'Неправильный номер телефона',
			}
		}
	});

});
