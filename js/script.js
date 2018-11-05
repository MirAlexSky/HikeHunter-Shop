'use strict'

/* 
	Спецификация:
		1) Слайды листаются через каждые %intervalTime
		2) Слайды начинают листаться, когда выбран слайдер
		3) При наведении мышкой, слайды не листаются автоматически
		4) При достижении последнего слайда, переход на первый
		Переменые и методы:
			1) currentSlider -  выбранный слайдер (всего 4)
			2) currentSlide - текущий слайд (всего 3)
			3) SliderLength - количество слайдов в слайдерах
*/

const intervalTime = 2500;

let interval,
	slideIsScaled = false;

let currentSlide = 0,
	currentSlider;

let sliderLength = 3;

$(function () {

	// Листать слайды начинаем тогда, когда выбран слайдер
	// Слыйдеры вибираются с помощью radio и css
	// Если интервал не был задан, задаём интервал
	$('.slideradio').change(function () {

		if ($('.slider-box').hasClass('invisible')) {
			$('.slider-box').removeClass('invisible');
		}

		if (!interval) {
			interval = setInterval(nextSlide, intervalTime);
		}

		// Идёт инициализация текущего слайдера 
		// для работы с текущими слайдами
		let nthSlider = $(this).index();
		currentSlider = $('.slider').get(nthSlider);

		// При выборе слайдера появляются элементы управления
		$('.controls').removeClass('hide');
		$('.slide-nav-btns').removeClass('hide');

	});

	$('.slider img, .control, .slide-nav-btns').hover(
		function () {
			clearInterval(interval);
		},
		function () {
			if (!slideIsScaled) {
				interval = setInterval(nextSlide, intervalTime);
			}
		}
	);

	$('#prevSlide').click(function () {
		prevSlide();
	});

	$('#nextSlide').click(function () {
		nextSlide();
	});

	$('.slide-nav-btn').click(function () {
		goToSlide($(this).index());
	});

	$('.slide img').click(function () {
		let container = $('.img-container');
		let clone = this.cloneNode(true);

		$(clone).addClass('slide_scaled');
		$(container).removeClass('img-container_hidden');
		$(container).append(clone);
		$(container).find('.slide_scaled').css('height', '90%');

		slideIsScaled = true;
		clearInterval(interval);

	});

	$('.img-container').click(function () {

/* 		if ($(this).find('.slide_scaled').get(0) != undefined) {
		$(this).find('.slide_scaled').animate({
				height: '0'
			},
			500,
			function () {
				$(this).remove();
			});
		} */

		$(this).empty();
		$(this).addClass('img-container_hidden');

		slideIsScaled = false;

		interval = setInterval(nextSlide, intervalTime);

	});

});

function nextSlide() {
	if (!currentSlider) return;
	goToSlide((currentSlide + 1) % sliderLength);
}

function prevSlide() {
	if (!currentSlider) return;
	goToSlide((sliderLength + currentSlide - 1) % sliderLength);
}

function goToSlide(nthSlide) {
	currentSlide = nthSlide;

	let translateX = -$(currentSlider).find('.slide').width() * currentSlide;

	$(currentSlider).css('transform', 'translate(' + translateX + 'px, 0)');
}

document.onclick = function (event) {
	console.log(event.target);
};