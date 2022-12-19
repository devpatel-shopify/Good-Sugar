new Swiper('.image_horizontal_slider_main', {
    // Default parameters
    slidesPerView: 2,
    spaceBetween: 1,
    mousewheel: false,
    centeredSlides: true,
    keyboard: {
        enabled: true,
    },
    
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 640px
      640: {
        slidesPerView: 5,
        spaceBetween: 1
      }
    }
  })