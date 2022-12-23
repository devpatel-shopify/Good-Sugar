
new Swiper(".product_page_slider_image", {
    slidesPerView: 1,
    loop: false,
    spaceBetween:0,
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

//   if (document.querySelector('.js-product__description')) {
//     const navbar = document.getElementById('js-addClass');
//     const description = document.querySelector('.header').scrollHeight;
//     const onScroll = () => {
//         const scroll = document.documentElement.scrollTop
//         if (scroll > description) {
//             navbar.classList.add("product__column-sticky_custom");
//         }
//         if (scroll < 2) {
//             navbar.classList.remove("product__column-sticky_custom")
//         }
//     }
//     window.addEventListener('scroll', onScroll)
// }