(function () {  
    window.gsapLoaded = false;
    const gsapInterval = setInterval(() => {
        if (window.gsap != undefined) {
            window.gsapLoaded = true;
            clearInterval(gsapInterval);
            initLoader();
            //AboutMapAnimation();
        }
    });
    function initLoader() {
        if (document.querySelector(".loading_main")) {
            const mainLoaderTimeline = gsap.timeline();
            const loader = document.querySelector(".section__card-inner .loading_main_logo");
            mainLoaderTimeline.from(loader, 0.9, {
                opacity: 1,
            });
            mainLoaderTimeline.from(loader, 0.9, {
                y: 100,
                ease: "power4.out",
                // delay: 1,
                skewY: 7,
                opacity: 0,
                stagger: {
                    amount: 0.3
                },
                onStart: function () {
                    document.querySelector(".loading_main").classList.add("animtion-loading");
                    document.querySelector("body").classList.add("scroll-lock")
                },
                onComplete: function () {
                    document.querySelector(".loading_main").classList.add("animtion-done");
                    setTimeout(function () {
                        document.querySelector(".loading_main").style.transform = "translateY(-100vh)";
                        setTimeout(function () {
                            document.querySelector(".loading_main").classList.add("hidden");
                            document.querySelector("body").classList.remove("scroll-lock");
                        }, 500);
                    }, 500);
                }
            });

            mainLoaderTimeline.to(loader, 1.8, {
                opacity: 1,
            })
        }
    }
    function AboutMapAnimation() {
        console.log("Making map pinned!...")
        if (document.querySelector(".map_container")) {
            const u = document.querySelector(".about_map");
            const mapContainer = document.querySelector(".map_container");
            const mapTextContainer = document.querySelector(".map_text_container");
            gsap.registerPlugin("ScrollTrigger");

            const mapTimeline = gsap.timeline({ marker: true, scrollTrigger: { end: "bottom bottom", invalidateOnRefresh: !0, pin: u, scrub: !0, start: "top top", trigger: mapContainer } });
            mapTimeline.fromTo(mapTextContainer, 1.8, {
                ease: "none",
                width: "62%",
                duration: 1,
            }, {
                width: "0",
                duration: 1,
            });

            mapTimeline.fromTo(mapContainer, 2.8, {
                width: "38%",
                ease: "none"
            }, {
                duration: 5,
                ease: "none",
                width: "100%",
                duration: 5
            });

        }
    }
})();

window.setGridHeight = (selector) =>{
    this.heightArray = [];
    this.offsetArrayArray = [];
    this.sectionArray = [];
  
  
    document.querySelectorAll(selector).forEach((grid,i)=>{
      var tmp = {'index':i,'offsetheight':grid.closest(`[data-equal]`).offsetTop};
      this.offsetArrayArray.push(tmp)
    });
  
    this.diffrentsHeights = []
    this.offsetArrayArray.forEach(function(e){
      if(this.diffrentsHeights.includes(e.offsetheight) == false){
        this.diffrentsHeights.push(e.offsetheight)
      }
    })
  
    this.diffrentsHeights.forEach(function(e){
      var data = [];
      for(var i = 0; i < this.offsetArrayArray.length; i++){
        if(this.offsetArrayArray[i].offsetheight == e){
          data.push(this.offsetArrayArray[i]);
        }
      }
  
      var getAllHeightArray = [];
      data.forEach(function(ele){
        document.querySelectorAll(selector)[ele.index].removeAttribute('style');
        getAllHeightArray.push(document.querySelectorAll(selector)[ele.index].offsetHeight);
      })
  
      var getMaxHeight = Math.max.apply(Math, getAllHeightArray);
      data.forEach(function(ele){
        document.querySelectorAll(selector)[ele.index].style.minHeight = getMaxHeight+'px';
      });
    })
  
   console.log('setGridHeight');
  }
  