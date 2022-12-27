document.addEventListener("DOMContentLoaded", function() {
    var scrollElement = document.getElementById('watchScroll');
    var scrollElementPos = scrollElement.scrollTop;
    var header = document.getElementsByClassName("about_map_main");
  
    scrollElement.addEventListener('scroll', function() {
      scrollElementPos = scrollElement.scrollTop;
      if(scrollElementPos >= 100){
        header.classList.add("scrolled");
      }
      else {
        header.classList.remove("scrolled");
      }
  
      console.log(scrollElementPos);
    });
  });