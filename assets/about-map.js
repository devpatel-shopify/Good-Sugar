var menu = document.getElementById('about_map_main');
var menuOpen = false;
window.onscroll = function() {
  if (window.pageYOffset > 1 ) {
    menu.classList.add('sticky');
  } else {
    menu.classList.remove('sticky');
  }
  if (window.pageYOffset > 0 && !menuOpen) {
    menu.classList.add('open');
    menuOpen = true;
  } else if (window.pageYOffset < 100 && menuOpen) {
    menu.classList.remove('open');
    menuOpen = false;
  }
};

new Swiper('.image_text_slide_main', {
    // Default parameters
    slidesPerView:"auto",
    spaceBetween: 0,
    mousewheel: true,
    mousewheel: {
      forceToAxis: false,
      releaseOnEdges: true,
    },
    //noSwiping: false,
    keyboard: {
        enabled: true,
    },   
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 640px
      750: {
        //slidesPerView: 1.8,
        spaceBetween: 0,
        autoHeight:100,
      }
    }
  })