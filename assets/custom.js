(function () {
    window.gsapLoaded = false;
    const gsapInterval = setInterval(() => {
        if (window.gsap != undefined) {
            window.gsapLoaded = true;
            clearInterval(gsapInterval);
            initLoader();
        }
    });
    function initLoader() {
        if (document.querySelector(".loading_main")) {
            const mainLoaderTimeline = gsap.timeline();
            const loader = document.querySelector(".section__card-inner .loading_main_logo");
            mainLoaderTimeline.from(loader, 1.8, {
                opacity: 1,
            });
            mainLoaderTimeline.from(loader, 1.8, {
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

})();