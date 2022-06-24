// carousel.js
import Swiper, { Navigation, Pagination, A11y } from 'swiper';

Swiper.use([Navigation, Pagination, A11y]);

function initSwiper(el, expression, modifiers) {
    var expression = parseInt(expression, 10);
    var direction = modifiers || ['horizontal'];
    var swiper = new Swiper(el, {
            direction: direction[0],
            slidesPerView: 1,
            spaceBetween: 5,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
              },
            breakpoints: {
                768: {
                    slidesPerView: expression > 2 ? expression - 1 : 1,
                    spaceBetween: 0,
                },
                1024: {
                    slidesPerView: expression,
                    spaceBetween: 0,
                },
            },
        });
}

export {initSwiper};

// main.js
import { initSwiper } from './custom/carousel.js';

Alpine.directive('carousel', (el, { modifiers, expression }) => {
    initSwiper(el, expression, modifiers);
});

// use in NJK component
// <div class="carousel swiper {{ carouselType }} {{ data.options.customClass.value }}" x-carousel.horizontal="{{ data.fields.view.value }}">
// ... [ swiper HTML format ]
// </div>
