$(document).ready(function(){
	if(Modernizr.mq('only screen and (max-width: 555.5px)')){
		$('.header__nav_a').insertAfter('.header__logo');
	}

	//index
	if($('.s_why').length){
		var swipeWhy = new Swiper('.s_why__slider_wrp',{
			slidesPerView: 1,
			loop: true,
			speed: 400,
			autoplay: 3000,
			onSlideChangeStart: function(el){
				var n = el.realIndex;
				$('.s_why__pager_dots span').eq(n).addClass('_current')
					.siblings().removeClass('_current');
				$('.s_why__left img').eq(n).addClass('_current')
					.siblings().removeClass('_current');
			},
			breakpoints:{
				1199:{
					autoHeight: true,
					autoplay: false
				}
			}
		});
		$('.s_why__pager_left').click(function(){
			swipeWhy.slidePrev();
		});
		$('.s_why__pager_right').click(function(){
			swipeWhy.slideNext();
		});
		$('.s_why__pager_dots span').click(function(){
			var n = $(this).index()+1;
			swipeWhy.slideTo(n);
		});
	}
	if($('.s_grid').length){
		setInterval(function(){
			if(!$('.s_grid__mission_dots span._current').next().length){
				$('.s_grid__mission_dots span').eq(0).addClass('_current')
					.siblings().removeClass('_current');
			}else{
				$('.s_grid__mission_dots span._current').next().addClass('_current')
					.siblings().removeClass('_current');
			}
		},2000);
		setTimeout(function(){
			setInterval(function(){
				if(!$('.s_grid__map_dots span._current').next().length){
					$('.s_grid__map_dots span').eq(0).addClass('_current')
						.siblings().removeClass('_current');
				}else{
					$('.s_grid__map_dots span._current').next().addClass('_current')
						.siblings().removeClass('_current');
				}
			},3000);
		},1000);
	}
	if($('.s_must').length){
		var i = 1;
		setInterval(function(){
			i++;
			if(i===5){
				i=1;
				$('#svg_big-1').addClass('_active').siblings().removeClass('_active');
			}else{
				$('#svg_big-'+i).addClass('_active').siblings().removeClass('_active');
			}
		},1500);
	}


	//portfolio.html
	if($('.s_portfolio').length){
		var ww = $(window).outerWidth(),
			offsetLeft = $('.s_portfolio .container').offset().left;
		offsetLeft = ww - $('.s_portfolio .container').outerWidth() - offsetLeft;

		$('.s_portfolio__item_imgs').each(function(){
			var el = $(this),
				srcs = el.data('src'),
				img = srcs.split(','),
				slider = [];
			for(var i = 0; i<img.length;i++){
				slider[i] = {src: img[i]};
			}
			el.vegas({
				slides: slider,
				transition: 'blur',
				autoplay: false,
				overlay: 'vendor/vegas/overlays/08.png',
				walk: function (index, slideSettings) {
					var item = el.closest('.s_portfolio__item'),
						pager = item.find('.s_portfolio__info_pager span').eq(index).addClass('_current').siblings().removeClass('_current');
				}
			});
		});
		$('.s_portfolio__info_pager span').click(function(){
			var el = $(this),
				n = el.index()-1,
				item = el.closest('.s_portfolio__item'),
				vegas = item.find('.s_portfolio__item_imgs');
			vegas.vegas('jump', n);
		});
		$('.s_portfolio__info_pagerLeft').click(function(){
			var item = $(this).closest('.s_portfolio__item'),
				vegas = item.find('.s_portfolio__item_imgs');
			vegas.vegas('previous');
		});
		$('.s_portfolio__info_pagerRight').click(function(){
			var item = $(this).closest('.s_portfolio__item'),
				vegas = item.find('.s_portfolio__item_imgs');
			vegas.vegas('next');
		});




		var slideCount = $('.s_portfolio__item').length;

		var projectsSwiper = new Swiper('.s_portfolio', {
			prevButton: '.s_portfolio__pager_prev',
			nextButton: '.s_portfolio__pager_next',
			spaceBetween: -offsetLeft-20,
			effect: 'fade',
			loop: true,
			loopedSlides: slideCount,
			autoHeight: true
		});
		if(Modernizr.mq('only screen and (min-width: 850.5px)')){
			$('.s_portfolio__pager').css({'width':offsetLeft+20 +'px'});
			$('.s_portfolio__item_imgs').css({'width': ww-offsetLeft-20 +'px'});
			var projectsThumbs = new Swiper('.s_portfolio__pager_slider', {
				direction: 'vertical',
				slidesPerView: 3,
				slideToClickedSlide: true,
				centeredSlides: true,
				mousewheel: true,
				loop: true,
				loopedSlides: slideCount
			});
		}else{
			var projectsThumbs = new Swiper('.s_portfolio__pager_slider', {
				slidesPerView: 3,
				slideToClickedSlide: true,
				centeredSlides: true,
				loop: true,
				loopedSlides: slideCount
			});
		}
		projectsSwiper.params.control = projectsThumbs;
		projectsThumbs.params.control = projectsSwiper;

		if(Modernizr.mq('only screen and (min-width: 1000.5px)')){
			$('.g_tooltip').each(function(){
				var el = $(this),
					small = el.find('small'),
					offsetPager = $('.s_portfolio__pager').offset().left,
					offsetTooltip = small.offset().left+650;
				if(offsetPager-offsetTooltip < 0){
					small.addClass('_right');
				}
			});
		}
	}

	//usefull.html
	$('.s_use__more').click(function(e){
		e.preventDefault();
		$(this).addClass('_active');
	});

	//items
	if($('.s_items').length){
		setTimeout(function(){
			$('.s_items__item').each(function(){
				if(!$(this).hasClass('_hovered')){
					$(this).find('svg')[0].pauseAnimations();
				}
			});
			$('.s_items h1').removeClass('_active');
		},1700);
		setTimeout(function(){
			$('.s_items h1').addClass('_active');
		},925);
		$('.s_items__item').hover(function(){
			$(this).addClass('_hovered').find('svg')[0].unpauseAnimations();
		},function(){
			$(this).removeClass('_hovered').find('svg')[0].pauseAnimations();
		});
	}


	//popups
	$('.popup').each(function(){
		var popup = $(this),
			popup_h = popup.outerHeight(),
			popup_w = popup.outerWidth(),
			h = $(window).height(),
			px = window.pageYOffset + h/2 - popup_h/2;
		popup.css({
			'top': px+'px',
			'margin-left': '-'+ popup_w/2 +'px',
		});
	});
	$('._open_pop, .header__right_call').click(function(e){
		e.preventDefault();
		var name = $(this).data('name'),
			popup = $('.popup_'+name),
			popup_h = popup.outerHeight(),
			popup_w = popup.outerWidth(),
			h = $(window).height(),
			px = window.pageYOffset + h/2 - popup_h/2;
		popup.css({
			'top': px+'px',
			'margin-left': '-'+ popup_w/2 +'px',
		});
		popup.find('form').trigger( 'reset' );
		var txt = $(this).data('txt');
		txt = txt.replace(/<\/?[^>]+(>|$)/g, "");
		popup.find('input[name="form"]').val(txt);
		if ($("body").height() > $(window).height()) {
			$('body,html').css({'overflow-y':'hidden','padding-right':'5px'});
		}
		$('.popup.popup_'+name+', .overlay').addClass('_visible');
	});
	$('.overlay, ._close_pop').click(function(e){
		e.preventDefault();
		$('.popup._visible').addClass('_back');
		$('.overlay').removeClass('_visible');
		setTimeout(function(){
			$('.popup._visible').removeClass('_visible _back');
			$('body,html').css({'overflow-y':'visible','padding-right':'0'});
		},450);
	});

	//mask
	$('input[name="phone"]').mask("+7 (999) 999-99-99");
	// validate
//	$("._validate").each(function () {
//		var it = $(this);
//		it.validate({
//			rules: {
//				form: {required: true},
//				phone: {required: true},
//				name: {required: false},
//				mail: {required: false}
//			},
//			messages: {},
//			errorPlacement: function (error, element) {},
//			submitHandler: function (form) {
//				var data = new FormData(it[0]);
//				$.ajax({
//					url: 'mail.php',
//					type: 'POST',
//					data: data,
//					cache: false,
//					processData: false,
//					contentType: false,
//					success: function( respond, textStatus, jqXHR ){
//						$('.popup').removeClass('_visible');
//						var name = 'thnx'
//						popup = $('.popup_'+name),
//							popup_h = popup.outerHeight(),
//							popup_w = popup.outerWidth(),
//							h = $(window).height(),
//							px = window.pageYOffset + h/2 - popup_h/2;
//						popup.css({
//							'top': px+'px',
//							'margin-left': '-'+ popup_w/2 +'px',
//						});
//						$('.popup.popup_'+name+', .overlay').addClass('_visible');
//						setTimeout(function () {
//							if ($('.popup_thnx').hasClass('_visible')) {
//								$('.popup_thnx, .overlay').removeClass('_visible');
//							}
//						}, 2000);
//						$("form").trigger( 'reset' );
//					},
//					error: function( jqXHR, textStatus, errorThrown ){
//						console.log('ОШИБКИ AJAX запроса: ' + textStatus );
//					}
//				});
//			},
//			success: function () {},
//			highlight: function (element, errorClass) {
//				$(element).addClass('_error');
//			},
//			unhighlight: function (element, errorClass, validClass) {
//				$(element).removeClass('_error');
//			}
//		});
//	});


	$(window).resize(function(){
		var popup = $('.popup._visible'),
			popup_h = popup.outerHeight(),
			popup_w = popup.outerWidth(),
			h = $(window).height(),
			px = window.pageYOffset + h/2 - popup_h/2;
		popup.css({
			'top': px+'px',
			'margin-left': '-'+ popup_w/2 +'px',
		});

		if(Modernizr.mq('only screen and (max-width: 555.5px)')){
			$('.header__nav_a').insertAfter('.header__logo');
		}else{
			$('.header__nav_a').appendTo('.header__nav');
		}
	});
});

function getMobileOperatingSystem() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	// Windows Phone must come first because its UA also contains "Android"
	if (/windows phone/i.test(userAgent)) {
		return "Windows Phone";
	}

	if (/android/i.test(userAgent)) {
		return "Android";
	}

	// iOS detection from: http://stackoverflow.com/a/9039885/177710
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return "iOS";
	}

	return null;
}

if (getMobileOperatingSystem()) {
	try {
		for (var si in document.styleSheets) {
			var styleSheet = document.styleSheets[si];
			if (!styleSheet.rules) continue;

			for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
				if (!styleSheet.rules[ri].selectorText) continue;

				if (styleSheet.rules[ri].selectorText.match(':hover')) {
					styleSheet.deleteRule(ri);
				}
			}
		}
	} catch (ex) {}
}

$(window).on('load',function(){
	setTimeout(function(){
		$('.g_preloader').addClass('_hide');
	},1000);

	setTimeout(function(){
		var popup = $('.popup'),
			popup_h = popup.outerHeight(),
			popup_w = popup.outerWidth(),
			h = $(window).height(),
			px = window.pageYOffset + h/2 - popup_h/2;
		popup.css({
			'top': px+'px',
			'margin-left': '-'+ popup_w/2 +'px',
		});
	},7000);
});


var onloadCallback = function() {
	$("._validate").each(function () {
		var it = $(this),
			btn = it.find('.g-recaptcha');
		var gcap = grecaptcha.render($(btn).attr("id"), {
			'sitekey' : '6LcmATYUAAAAAHLvWTK9aZ0vQkiavSqOT3zIje5Q',
			"size": "invisible",
			'callback' : function(token){
				var data = new FormData(it[0]);
				$.ajax({
					url: 'mail.php',
					type: 'POST',
					data: data,
					cache: false,
					processData: false,
					contentType: false,
					success: function( respond, textStatus, jqXHR ){
						$('.popup').removeClass('_visible');
						var name = 'thnx'
						popup = $('.popup_'+name),
							popup_h = popup.outerHeight(),
							popup_w = popup.outerWidth(),
							h = $(window).height(),
							px = window.pageYOffset + h/2 - popup_h/2;
						popup.css({
							'top': px+'px',
							'margin-left': '-'+ popup_w/2 +'px',
						});
						$('.popup.popup_'+name+', .overlay').addClass('_visible');
						setTimeout(function () {
							if ($('.popup_thnx').hasClass('_visible')) {
								$('.popup_thnx, .overlay').removeClass('_visible');
							}
						}, 2000);
						$("form").trigger( 'reset' );
					},
					error: function( jqXHR, textStatus, errorThrown ){
						console.log('ОШИБКИ AJAX запроса: ' + textStatus );
					}
				});
			}
		});
		it.validate({
			rules: {
				form: {required: true},
				phone: {required: true},
				name: {required: true},
				mail: {required: true}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {
				grecaptcha.execute(gcap);
			},
			success: function () {
			},
			highlight: function (element, errorClass) {
				$(element).addClass('_error');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('_error');
			}
		});
	});
};
