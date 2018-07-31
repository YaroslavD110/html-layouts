/* -------------------
   Typed text settings
   ------------------- */
var typingTextArray = ["Developer.", "Graphic Designer.", "Freelancer."];

/* -------------------
        Preloader
   ------------------- */
$(window).on('load', function() {
    setTimeout(function() {
        $('body').css('overflow', 'auto');
        $('#preloader').fadeOut(600);
    }, 1000);
});

$(document).ready(function() {

    /* -------------------
           Fixed menu
       ------------------- */
    $(window).on('scroll', function(){

        var header = $('.fixed-menu-top'),
            scrollTop = Math.round($(window).scrollTop());

        if( scrollTop > 1 ) {
            header.addClass('collapsed-menu');
        } else {
            header.removeClass('collapsed-menu');
        }

    });

    /* -------------------
           Menu toggle
       ------------------- */
    $('.fixed-menu-top .menu-btn .menu-toggle--btn').click(function() {
        if( $(window).width() < 767 )
            ToggleMenu();
    });

    $('.fixed-menu-top .main-menu ul li').click(function() {
        if( $(window).width() < 767 )
            ToggleMenu();
    });

    function ToggleMenu() {
        $('.fixed-menu-top .main-menu ul').slideToggle(600, function(){
            if( $(this).attr('style') === 'display: none;' )
                $(this).removeAttr('style');
        });

        $('.fixed-menu-top .menu-btn .menu-toggle--btn').toggleClass('animated_btn');

        if( $('.fixed-menu-top').attr('class') != 'fixed-menu-top collapsed-menu' )
            $('.fixed-menu-top').addClass('collapsed-menu');
    }

    /* -------------------
           Typed text
       ------------------- */
    new Typed( "#typed-text", {
        strings: typingTextArray,
        typeSpeed: 100,
        loop: true
    });

    /* -------------------
           Progressbar
       ------------------- */
    $(window).scroll(function() {
        var scrollToEl = $(window).scrollTop() - document.getElementById('about').offsetTop;

        if( scrollToEl > -60 ) {
            $(".progress-bar .progress-line").each(function() {

                var width = $(this).data("percent");
                $(this).css("width", width + '%');

            });
        }
    });

    /* -------------------
          Mix gallery
       ------------------- */
    var mixerContainer = $('#works-gallery'),
        mixer = mixitup(mixerContainer, {
            selectors: {
                control: '.works-filter ul > li'
            }
        });


    $('.works-filter ul li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    /* -------------------
          Popup gallery
       ------------------- */
    $('#works-gallery .works-item').each(function() {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image'
        });
    });

    /* -------------------
          OWL carousel
       ------------------- */
    $(".comments-area .owl-carousel").owlCarousel({
        items: 1,
        mouseDrag: true,
        autoplay: true,
        smartSpeed: 500
    });

    /* -------------------
         Form validation
       ------------------- */
    $("#main-form").validate({
        rules: {
            name: {
                required: true,
                min: 2
            },

            email: {
                required: true,
                email: true
            },

            subject: {
                required: true,
                min: 4
            },

            message: {
                required: true,
                min: 10
            }
        }
    });

    /* -------------------
             Scroll
       ------------------- */
    var topMenu = $("#main-menu"),
        topMenuHeight = topMenu.outerHeight()-15,
        menuItems = $("#main-menu ul li a");

    menuItems.click(function(e){
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 600);
        e.preventDefault();
    });

    new ScrollSpy('#main-menu', {
        nav: '#main-menu > ul > li > a',
        className: 'active'
    });

    /* -------------------
              WOW js
       ------------------- */
    new WOW({ mobile: false }).init();

    /* -------------------
          Counterup js
       ------------------- */
    $('.counter').counterUp({
        delay: 4,
        time: 800
    });
});
