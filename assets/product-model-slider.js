new Swiper(".product_model_slider", {
    slidesPerView: 1,
    loop: false,
    spaceBetween:0,
    autoHeight: false,
    //grabCursor: true,
    //centeredSlides: true,
    // autoplay: {
    //   delay: 2000,
    // },
    breakpoints: {
    750: {
      slidesPerView: 2,
    //   autoplay: {
    //   delay: 10000,
    // },
    },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: 'bullets',
    },
    renderBullet: function (index, className) {
      return `<span class="outer-dot swiper-pagination-bullet"><span class="inner-dot"></span></span>`;
    },
    navigation: {
      nextEl: ".swiper--next",
      prevEl: ".swiper--prev",
    },
    
  });