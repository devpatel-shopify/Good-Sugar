var init = false;

function swiperCard() {
  if (window.innerWidth >= 750) {
    if (!init) {
      init = true;
      swiper = new Swiper('.text_horizonatl_slider_main', {
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        mousewheel: {
          forceToAxis: false,
          releaseOnEdges: true,
        },
        //noSwiping: false,
        keyboard: {
            enabled: true,
        },
        
        // Responsive breakpoints
        breakpoints: {
          // when window width is >= 640px
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 0,
            autoHeight:100,
          },
          750: {
            slidesPerView: 1.5,
            spaceBetween: 0,
            autoHeight:100,
          }
        }
      });
    }
  } else if (init) {
    swiper.destroy();
    init = false;
  }
}
swiperCard();
window.addEventListener("resize", swiperCard);