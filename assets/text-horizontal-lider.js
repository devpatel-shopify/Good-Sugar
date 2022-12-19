new Swiper('.text_horizonatl_slider_main', {
    slidesPerView: 2.5,
    spaceBetween: 0,
    loop: !0,
    mousewheel: true,
    keyboard: {
        enabled: true,
    },
    
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 640px
      640: {
        slidesPerView: 2.5,
        spaceBetween: 0,
        autoHeight:100,
      }
    }
  })