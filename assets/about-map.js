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
    autoHeight:100,
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
        //spaceBetween: 0,
        autoHeight:100,
      }
    }
  })

/*********************************************/

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

var headerHeight = document.querySelector("sticky-header").offsetHeight;
/* Panels */
let panels = gsap.utils.toArray("#slider-container .slider-item");
let panelsContainer = document.querySelector("#slider-container");

var containerWidth = 0 ;
var slides = document.getElementsByClassName("slider-item");
for (var i = 0; i < slides.length; i++) {
  containerWidth += parseInt(slides.item(i).offsetWidth, 10);
}
console.log({
  containerWidth:containerWidth,
  headerHeight:headerHeight
});
panelsContainer.style.display  = "flex";
panelsContainer.style.width  = containerWidth+"px";

  gsap.to("#slider-container", {
    xPercent: -100, 
    x: () => innerWidth,
    ease: "none",
    scrollTrigger: {
      trigger: "#slider-container",
      pin: "#MainContent",
      start: "top center",
      end: "center 100px",
      //end: () => (innerWidth*2),
      scrub: 3,
      invalidateOnRefresh:true,
      markers:true
    }
  });


  gsap.to("#about_map_main", {
    xPercent: -100, 
    x: () => innerWidth,
    //x: () => document.getElementsByClassName("about_map_wrapper").offsetWidth,
    ease: "none",
    scrollTrigger: {
      trigger: "#about_map_main",
      pin: "#MainContent",
      start: "top 148px",
      end: "bottom center",
      //end: () => (innerWidth*2),
      scrub: 3,
      invalidateOnRefresh:true,
      markers:true
    }
  });


  


// let mm = gsap.matchMedia();

// mm.add("(min-width: 1024px)", () => {
//   // desktop setup code here...
  
// });

// mm.add("(max-width: 1023px)", () => {
//   // mobile setup code here...
//   return function() {
//       //gsap.kill(); 
//       // other cleanup code can go here. 
//     };
// });
