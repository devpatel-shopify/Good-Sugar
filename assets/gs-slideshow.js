let mySwiper = new Swiper(".swiper", {
    direction: "vertical",
    effect: "coverflow",
    spaceBetween: 0,
    grabCursor: !0,
    centeredSlides: !0,
    loop: !0,
    loopedSlides: 6,
    slidesPerView: "auto",
    mousewheel: true,
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

