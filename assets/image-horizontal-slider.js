if('.image_horizontal_slider_main'){
new Swiper('.image_horizontal_slider_main', {
    // Default parameters
    slidesPerView: 1.8,
    spaceBetween: 30,
    mousewheel: true,
    mousewheel: {
      forceToAxis: false,
      releaseOnEdges: true,
    },
    autoHeight:100,
    //centeredSlides: true,
    keyboard: {
        enabled: true,
    },    
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 640px
      750: {
        slidesPerView: 4,
        spaceBetween: 60,
        autoHeight:100,
      }
    }
  })
}

if('.image_horizontal_slider_main_tablet'){
  new Swiper('.image_horizontal_slider_main_tablet', {
      // Default parameters
      slidesPerView: 1.8,
      spaceBetween: 30,
      mousewheel: true,
      mousewheel: {
        forceToAxis: false,
        releaseOnEdges: true,
      },
      autoHeight:100,
      //centeredSlides: true,
      keyboard: {
          enabled: true,
      },
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 640px
        750: {
          slidesPerView: 3,
          spaceBetween: 60,
          autoHeight:100,
        }
      }
    })
  }

if('.image_horizontal_slider_main_mobile'){
  new Swiper('.image_horizontal_slider_main_mobile', {
   // Default parameters
   slidesPerView: 1.8,
   spaceBetween: 30,
   mousewheel: true,
   mousewheel: {
     forceToAxis: false,
     releaseOnEdges: true,
   },
   autoHeight:100,
   //centeredSlides: true,
   keyboard: {
       enabled: true,
   },
   // Responsive breakpoints
   breakpoints: {
     // when window width is >= 640px
     750: {
       slidesPerView: 4,
       spaceBetween: 60,
       autoHeight:100,
     }
   }
 })
}
