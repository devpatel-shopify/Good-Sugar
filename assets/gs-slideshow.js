let mySwiper = new Swiper(".swiper", {
    direction: "vertical",
    effect: "coverflow",
    spaceBetween: 0,
    grabCursor: false,
    centeredSlides: !0,
    //speed: {{ speed }},
    loop: !0,
    loopedSlides: 1,
    slidesPerView: "auto",
    freeMode: true,
    allowTouchMove: false,
    freeModeMomentum: false,
    mousewheelSensitivity: 0.002,
    watchSlidesProgress: true,
    keyboard: {
        enabled: true,
    },
    coverflowEffect: {
        rotate: 0,
        stretch: '86%',
        depth: '200',
        modifier: 1,
        slideShadows: true,
    },
    on: {
        init(e){
            for (let r = 0; r < e.slides.length; r += 1) {
              const t = e.slides[r],
                    o = e.slides[r].progress,
                    i = Math.abs(o);
                t.style.opacity = i > 2.5 ? 0 : 1;
            }
        },
        progress(e){
            for (let r = 0; r < e.slides.length; r += 1) {
              const t = e.slides[r],
                    o = e.slides[r].progress,
                    i = Math.abs(o);
                    t.style.opacity = i > 2.5 ? 0 : 1;
            }
        }
    }
});

let GSSlideshowParent = document.getElementById('MainContent');
let GSSlideshow = document.querySelector('.gs-slideshow-section');
let GSSlideshowHeight = GSSlideshow.getBoundingClientRect().height;
GSSlideshowParent.style.setProperty('min-height', `${parseInt(GSSlideshowHeight)}px`);