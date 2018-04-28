(function($){
  "use strict";

  var $window = $(window);

  $window.on('load', function() {
    $window.trigger("resize");
  });

  // Preloader
  $('.loader').fadeOut();
  $('.loader-mask').delay(300).fadeOut('slow');


  // Init
  initOwlCarousel();
  

  $window.on('resize', function() {
    hideSidenav();
  });


  /* Detect Browser Size
  -------------------------------------------------------*/
  var minWidth;
  if (Modernizr.mq('(min-width: 0px)')) {
    // Browsers that support media queries
    minWidth = function (width) {
      return Modernizr.mq('(min-width: ' + width + 'px)');
    };
  }
  else {
    // Fallback for browsers that does not support media queries
    minWidth = function (width) {
      return $window.width() >= width;
    };
  }


  /* Mobile Detect
  -------------------------------------------------------*/
  if (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)) {
     $("html").addClass("mobile");
     $('.dropdown-toggle').attr('data-toggle', 'dropdown');
  }
  else {
    $("html").removeClass("mobile");
  }

  /* IE Detect
  -------------------------------------------------------*/
  if(Function('/*@cc_on return document.documentMode===10@*/')()){ $("html").addClass("ie"); }


  /* Sticky Navigation
  -------------------------------------------------------*/
  $window.scroll(function(){
    scrollToTop();    
    stickyNav(); 
  });

  var $stickyNav = $('.nav--sticky');
  var $nav = $('.nav');

  function stickyNav() {
    if ($window.scrollTop() > 2) {
      $stickyNav.addClass('sticky');
      $nav.addClass('sticky');
    } else {
      $stickyNav.removeClass('sticky');
      $nav.removeClass('sticky');
    }
  }


  /* Mobile Navigation
  -------------------------------------------------------*/
  var $sidenav = $('#sidenav'),
      $mainContainer = $('#main-container'),
      $navIconToggle = $('.nav-icon-toggle'),
      $navHolder = $('.nav__holder'),
      $contentOverlay = $('.content-overlay'),
      $htmlContainer = $('html'),
      $sidenavCloseButton = $('#sidenav__close-button');


  $navIconToggle.on('click', function(e) {
    e.stopPropagation();
    $(this).toggleClass('nav-icon-toggle--is-open');
    $sidenav.toggleClass('sidenav--is-open');   
    $contentOverlay.toggleClass('content-overlay--is-visible');
    // $htmlContainer.toggleClass('oh');
  });

  function resetNav() {
    $navIconToggle.removeClass('nav-icon-toggle--is-open');
    $sidenav.removeClass('sidenav--is-open');
    $contentOverlay.removeClass('content-overlay--is-visible');
    // $htmlContainer.removeClass('oh');
  }

  function hideSidenav() {
    if( minWidth(992) ) {
      resetNav();
    }
  }

  $contentOverlay.on('click', function() {
    resetNav();
  });

  $sidenavCloseButton.on('click', function() {
    resetNav();
  });
  

  var $dropdownTrigger = $('.nav__dropdown-trigger'),
      $navDropdownMenu = $('.nav__dropdown-menu'),
      $navDropdown = $('.nav__dropdown');


  if ( $('html').hasClass('mobile') ) {

    $('body').on('click',function() {
      $navDropdownMenu.addClass('hide-dropdown');
    });

    $navDropdown.on('click', '> a', function(e) {
      e.preventDefault();
    });

    $navDropdown.on('click',function(e) {
      e.stopPropagation();
      $navDropdownMenu.removeClass('hide-dropdown');
    });
  }


  /* Sidenav Menu
  -------------------------------------------------------*/
  $('.sidenav__menu-toggle').on('click', function(e) {
    e.preventDefault();
    
    var $this = $(this);
    
    $this.parent().siblings().removeClass('sidenav__menu--is-open');
    $this.parent().siblings().find('li').removeClass('sidenav__menu--is-open');
    $this.parent().find('li').removeClass('sidenav__menu--is-open');
    $this.parent().toggleClass('sidenav__menu--is-open');       
    
    if ($this.next().hasClass('show')) {
      $this.next().removeClass('show').slideUp(350);    
    } else {
      $this.parent().parent().find('li .sidenav__menu-dropdown').removeClass('show').slideUp(350);
      $this.next().toggleClass('show').slideToggle(350);
    }
  });


  /* Nav Seacrh
  -------------------------------------------------------*/
  (function() {
    var navSearchTrigger = $('.nav__search-trigger'),
        navSearchTriggerIcon = navSearchTrigger.find('i'),
        navSearchBox = $('.nav__search-box'), 
        navSearchInput = $('.nav__search-input'); 

    navSearchTrigger.on('click', function(e){
      e.preventDefault();
      navSearchTriggerIcon.toggleClass('ui-close');
      navSearchBox.slideToggle();      
    });
  })();
  
  /* News Ticker
  -------------------------------------------------------*/
  var $newsTicker = $('.newsticker');

  if($newsTicker.length) {
    $newsTicker.newsTicker({
      row_height: 26,
      max_rows: 1,
      prevButton: $('#newsticker-button--prev'),
      nextButton: $('#newsticker-button--next')
    });
  }  



  /* Tabs
  -------------------------------------------------------*/
  $('.tabs__trigger').on('click', function(e) {
    var currentAttrValue = $(this).attr('href');
    $('.tabs__content-trigger ' + currentAttrValue).stop().fadeIn(1000).siblings().hide();
    $(this).parent('li').addClass('tabs__item--active').siblings().removeClass('tabs__item--active');
    e.preventDefault();
  });
  

  /* Owl Carousel
  -------------------------------------------------------*/
  function initOwlCarousel(){

    // Hero
    $("#owl-hero-grid").owlCarousel({
      center: false,
      items: 1,
      loop: true,
      nav: true,
      dots: true,
      margin: 0,
      lazyLoad: true,
      navSpeed: 500,
      navText: ['<i class="ui-arrow-left">','<i class="ui-arrow-right">']
    });

    // Posts Carousel
    $("#owl-posts").owlCarousel({
      center: false,
      items: 2,
      loop: true,
      nav: false,
      dots: false,
      margin: 16,
      lazyLoad: true,
      navSpeed: 500,
      navText: ['<i class="ui-arrow-left">','<i class="ui-arrow-right">'],
      responsive:{
        768:{
          items:3
        }
      }
    });
      
       $("#owl-posts_cat").owlCarousel({
      center: false,
      items: 2,
      loop: true,
      nav: false,
      dots: false,
      margin: 16,
      lazyLoad: true,
      navSpeed: 500,
      navText: ['<i class="ui-arrow-left">','<i class="ui-arrow-right">'],
      responsive:{
        0:{
			items:2,
			/*nav:true*/
		},
        992:{
          items:4
        },
        768:{
          items:3
        }
      }
    });

    // Single Image
    $("#owl-single").owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      dots: false,
      lazyLoad: true,
      navSpeed: 500,
      navText: ['<i class="ui-arrow-left">','<i class="ui-arrow-right">']
    });

    // Single Post Gallery
    $("#owl-single-post-gallery").owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      dots: true,
      lazyLoad: true,
      navSpeed: 500,
      navText: ['<i class="ui-arrow-left">','<i class="ui-arrow-right">']
    });

    // Custom nav
    var owlNav = $('#owl-posts, #owl-posts_cat').owlCarousel();
    $(".carousel-nav__btn--prev").on('click', function () {
        owlNav.trigger('prev.owl.carousel');
    });

    $(".carousel-nav__btn--next").on('click', function () {
        owlNav.trigger('next.owl.carousel');
    });    
  };


  /* Scroll to Top
  -------------------------------------------------------*/
  function scrollToTop() {
    var scroll = $window.scrollTop();
    var $backToTop = $("#back-to-top");
    if (scroll >= 50) {
      $backToTop.addClass("show");
    } else {
      $backToTop.removeClass("show");
    }
  }
	

	$('.subscribe').click(function(){
	  $('.pop-up').addClass('open');
	  $('.main').addClass('popup_bg');
	});

	$('.pop-up .close').click(function(){
	  $('.pop-up').removeClass('open');
        $('.main').removeClass('popup_bg');
	});

	$(document).on('keyup',function(evt) {
		if (evt.keyCode == 27) {
		   $('.pop-up').removeClass('open');
           $('.main').removeClass('popup_bg');
		}
       
	});
    

  $('a[href="#top"]').on('click',function(){
    $('html, body').animate({scrollTop: 0}, 1000, "easeInOutQuint");
    return false;
  });


    
/*$('.nav__menu > li').click(function() {
    $('li').removeClass('active a:after');
    $(this).addClass('activer');
});*/
	

      $('.nav__menu').on( 'click','li', function() {
            $('.nav__menu li.active').removeClass( 'active' );
            $( this ).addClass( 'active' );
      });

  
})(jQuery);
