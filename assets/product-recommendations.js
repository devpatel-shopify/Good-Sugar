new Swiper('.product-recommendations-swiper', {
    // Default parameters
    slidesPerView: 2,
    spaceBetween: 0,
    mousewheel: true,
    centeredSlides: true,
    keyboard: {
        enabled: true,
    },    
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 640px
      750: {
        slidesPerView: 2,
        spaceBetween: 0,
      }
    }
  })