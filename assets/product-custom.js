new Swiper(".product_custom_image_main", {
    slidesPerView: 1,
    loop: false,
    spaceBetween: 35,
    autoHeight: false,
    //grabCursor: true,
    //centeredSlides: true,
    autoplay: {
      delay: 1000,
    },
    breakpoints: {
    991: {
      autoplay: {
      delay: 10000,
    },
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