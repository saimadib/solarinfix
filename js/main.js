(function ($) {
    "use strict";

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
            $('.navbar').removeClass('scrolled');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a, .btn-scroll").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });






    // Counter animation for Stats section
    var counterAnimated = false;

    function animateCounters() {
        if (counterAnimated) return;
        counterAnimated = true;

        $('.counter').each(function () {
            var $this = $(this);
            var target = parseFloat($this.data('target'));
            var isDecimal = target % 1 !== 0;
            var duration = 2000;

            $({ countNum: 0 }).animate(
                { countNum: target },
                {
                    duration: duration,
                    easing: 'swing',
                    step: function () {
                        if (isDecimal) {
                            $this.text(this.countNum.toFixed(1));
                        } else {
                            $this.text(Math.floor(this.countNum));
                        }
                    },
                    complete: function () {
                        if (isDecimal) {
                            $this.text(target.toFixed(1));
                        } else {
                            $this.text(target);
                        }
                    }
                }
            );
        });
    }

    // Trigger counter animation when stats section is in viewport
    $(window).on('scroll', function () {
        var statsSection = $('.stats-section');
        if (statsSection.length) {
            var sectionTop = statsSection.offset().top;
            var sectionHeight = statsSection.outerHeight();
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();

            if (scrollTop + windowHeight > sectionTop + 100 && scrollTop < sectionTop + sectionHeight) {
                animateCounters();
            }
        }
    });

})(jQuery);
