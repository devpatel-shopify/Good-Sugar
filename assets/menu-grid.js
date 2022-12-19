new Swiper('.menu-grid_slider', {
    // Default parameters
    slidesPerView: 1,
    direction: 'vertical',
    spaceBetween: 0,
    mousewheel: true,
    keyboard: {
        enabled: true,
    },
    
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 640px
      640: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    }
  })