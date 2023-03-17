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
        slidesPerView: 1.3,
        spaceBetween: 0
      }
    }
  })

Splitting();
//const target = document.querySelector('#target');
//const results = Splitting({ target: target, by: 'lines' });

const layers = Array.from(document.querySelectorAll(".sticker_image"));
    document.onmousemove = function (e) {
      layers.map(function (layer, index) {
        let xAxis = (window.innerWidth / 2 - e.clientX) / 25;
        let yAxis = (window.innerHeight / 2 - e.clientY) / 25;
        layer.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
      });
    };