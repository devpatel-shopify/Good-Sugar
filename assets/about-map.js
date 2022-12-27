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