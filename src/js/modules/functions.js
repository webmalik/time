import $ from "jquery";
import Aos from "aos";
import Siema from "siema";

export function isWebp() {
	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});
}

export function burgerMenu() {
	$('.header__burger').on("click", function (event) {
		$('.header__burger, .header__menu').toggleClass('open');
		$('body').toggleClass('lock');
	});
}

export function sticky() {
	window.addEventListener('scroll', function () {
		$('header').toggleClass('sticky', window.scrollY > 0);
	});
}

export function pageNav() {
	const headerLinks = $('.header__link');

	headerLinks.each(function () {
		$(this).on('click', function (event) {
			event.preventDefault();

			const targetId = $(this).attr('href');
			const targetElement = $(`${targetId}:first`);
			const targetOffset = targetElement.offset().top - 100;
			$('html, body').animate({
				scrollTop: targetOffset
			}, 800);
		});
	});

	function activateMenuItem() {
		const scrollPosition = $(window).scrollTop();

		headerLinks.each(function () {
			const section = $(`${$(this).attr('href')}:first`);
			if (
				section.offset().top <= scrollPosition + 105 &&
				section.offset().top + section.outerHeight() > scrollPosition + 105
			) {
				headerLinks.removeClass('active');
				headerLinks.parent().removeClass('active');
				$(this).addClass('active');
				$(this).parent().addClass('active');
			}
		});
	}

	$(window).on('scroll', activateMenuItem);
}

export function aos_js() {
	Aos.init();
}

export function slider() {
	const slider = new Siema({
		selector: '.slider',
		loop: true,
		onChange: updatePagination,
		duration: 1000,
		perPage: 4,
		easing: 'ease-out',
	});

	function updatePagination() {
		const paginationItems = Array.from(document.querySelectorAll('.slider-pagination li'));
		paginationItems.map((item, index) => {
			if (index === slider.currentSlide) {
				item.classList.add('active');
			} else {
				item.classList.remove('active');
			}
		});
	}

	function startAutoPlay(intervalTime) {
		let autoPlayInterval = setInterval(function () {
			slider.next();
			updatePagination();
		}, intervalTime);
	}
	updatePagination();
	startAutoPlay(5000);
}

export function tel() {
	var input = document.getElementById("phone-ip");

	input.onfocus = function (e) {
		if (this.value === '') {
			this.value += '+38 (';
		}
	};

	input.onkeyup = function (e) {
		var len = this.value.length;
		if (len === 8) {
			this.value += ') ';
		}
		if (len === 9) {
			this.value += ' ';
		}
		if (len === 12) {
			this.value += '-';
		}
	}
	if (len === 15) {
		this.value += '-';
	}
}

export function swiperInit() {
	const sw = new Swiper('.swiper-container', {
		slidesPerView: 'auto',
		role: {
			group: true,
		},
		spaceBetween: 40,
	});

	sw.init();
}

export function Accordeon() {
	class ItcAccordion {
		constructor(target, config) {
			this._el = typeof target === 'string' ? document.querySelector(target) : target;
			const defaultConfig = {
				alwaysOpen: true,
				duration: 350
			};
			this._config = Object.assign(defaultConfig, config);
			this.addEventListener();
		}
		addEventListener() {
			this._el.addEventListener('click', (e) => {
				const elHeader = e.target.closest('.accordion__header');
				if (!elHeader) {
					return;
				}
				if (!this._config.alwaysOpen) {
					const elOpenItem = this._el.querySelector('.accordion__item_show');
					if (elOpenItem) {
						elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
					}
				}
				this.toggle(elHeader.parentElement);
			});
		}
		show(el) {
			const elBody = el.querySelector('.accordion__body');
			if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
				return;
			}
			elBody.style['display'] = 'block';
			const height = elBody.offsetHeight;
			elBody.style['height'] = 0;
			elBody.style['overflow'] = 'hidden';
			elBody.style['transition'] = `height ${this._config.duration}ms ease`;
			elBody.classList.add('collapsing');
			el.classList.add('accordion__item_slidedown');
			elBody.offsetHeight;
			elBody.style['height'] = `${height}px`;
			window.setTimeout(() => {
				elBody.classList.remove('collapsing');
				el.classList.remove('accordion__item_slidedown');
				elBody.classList.add('collapse');
				el.classList.add('accordion__item_show');
				elBody.style['display'] = '';
				elBody.style['height'] = '';
				elBody.style['transition'] = '';
				elBody.style['overflow'] = '';
			}, this._config.duration);
		}
		hide(el) {
			const elBody = el.querySelector('.accordion__body');
			if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
				return;
			}
			elBody.style['height'] = `${elBody.offsetHeight}px`;
			elBody.offsetHeight;
			elBody.style['display'] = 'block';
			elBody.style['height'] = 0;
			elBody.style['overflow'] = 'hidden';
			elBody.style['transition'] = `height ${this._config.duration}ms ease`;
			elBody.classList.remove('collapse');
			el.classList.remove('accordion__item_show');
			elBody.classList.add('collapsing');
			window.setTimeout(() => {
				elBody.classList.remove('collapsing');
				elBody.classList.add('collapse');
				elBody.style['display'] = '';
				elBody.style['height'] = '';
				elBody.style['transition'] = '';
				elBody.style['overflow'] = '';
			}, this._config.duration);
		}
		toggle(el) {
			el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
		}
	}
	new ItcAccordion(document.querySelector('.order-item__accordion'), {
		alwaysOpen: true
	});
}