;$(document).ready(function() {
	// Паралакс
	var scene = document.getElementById('scene');
	var parallaxInstance = new Parallax(scene);

	var scene_2 = document.getElementById('scene_2');
	var parallaxInstance_2 = new Parallax(scene_2);

	var scene_3 = document.getElementById('scene_3');
	var parallaxInstance_2 = new Parallax(scene_3);

	// Скрол
	$("menu ul li a").mPageScroll2id({
		offset: 50
	});

	// Валідація
	$("#header_form").validate({
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

	$("#health_form").validate({
		rules: {
			email: {
				required: true,
				email: true,
			}
		},

		messages: {
			email: {
				required: 'Введите вашу почту',
				email: 'Неправильная почта',
			}
		}
	});

	$("#know_form_1").validate({
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

	$("#know_form_2").validate({
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

	$("#footer_form").validate({
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

	// Меню
	$('header .fixed_menu .menu-btn').click(function() {
		if( $(window).width() < 992 ) {
			closeHeaderMenu();
		}
	});

	$('header .fixed_menu menu ul li a').click(function() {
		if( $(window).width() < 992 ) {
			closeHeaderMenu();
		}
	});

	function closeHeaderMenu() {
		$('header .fixed_menu menu ul').slideToggle(600, function(){

			if( $(this).attr('style') === 'display: none;' ) {
				$(this).removeAttr('style');
			}

		});

		$('header .fixed_menu .menu-btn').toggleClass('rotate-btn');
	};
});
