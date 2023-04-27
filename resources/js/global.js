
// GLOBAL
import $ from 'jquery';
window.$      = $;
window.jQuery = $;

// MENU
document.getElementById("menu-bar").onclick = function menuOnClick() {
    $('#menu-bar').toggleClass('open');
    $('.menu').toggleClass('open');
    $('.menu-mobile-bg').toggleClass('open');
}
