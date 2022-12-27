new Swiper('.menu-grid_slider', {
    // Default parameters
    slidesPerView: 1,
    direction: 'vertical',
    grabCursor: true,
    spaceBetween: 0,
    mousewheel: true,
    //parallax: !0,
    //loop:true,
    //roundLengths: true,
    speed: 800,
    //longSwipesMs:1500,
    mousewheel: {
      forceToAxis: false,
      releaseOnEdges: true,
      thresholdTime: '5000ms',
      thresholdDelta:2,
      //sensitivity:5
    },
    effect: "slide",
    //effect: "fade",
    // effect: "creative",
    //     creativeEffect: {
    //       prev: {
    //         shadow: true,
    //         translate: [0, "0", -1]
    //       },
    //       next: {
    //         translate: [0,"100%", 0]
    //       },
    //     },
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

Splitting();
//const target = document.querySelector('#target');
//const results = Splitting({ target: target, by: 'lines' });

