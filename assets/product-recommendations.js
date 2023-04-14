// new Swiper('.product-recommendations-swiper', {
//     // Default parameters
//     slidesPerView: 2,
//     spaceBetween: 0,
//     mousewheel: true,
//     centeredSlides: true,
//     keyboard: {
//         enabled: true,
//     },    
//     // Responsive breakpoints
//     breakpoints: {
//       // when window width is >= 640px
//       750: {
//         slidesPerView: 2,
//         spaceBetween: 0,
//       }
//     }
//   });


var init = false;

function productRecommendationsSwiper() {
  if (window.innerWidth >= 0) {
    if (!init) {
      init = true;
      console.log(document.querySelector('.product_recommendations_slider'));
      var swiper = new Swiper('.product_recommendations_slider', {
        slidesPerView: 2,
        spaceBetween: 0,
        mousewheel: true,
        mousewheel: {
          //invert: true,
          forceToAxis: false,
          releaseOnEdges: true,
        },
        autoHeight:100,
        noSwiping: false,
        keyboard: {
            enabled: true,
        },
        
        // Responsive breakpoints
        breakpoints: {
          // when window width is >= 640px
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
            autoHeight:100,
          },
          750: {
            slidesPerView: 2,
            spaceBetween: 0,
            autoHeight:100,
          }
        }
      });
    console.log("Hello Hello", swiper);
    }
  } else if (init) {
    swiper.destroy();
    init = false;
  }
  window.setGridHeight('.card__title_description');
}
// productRecommendationsSwiper();
window.addEventListener("resize", productRecommendationsSwiper);

