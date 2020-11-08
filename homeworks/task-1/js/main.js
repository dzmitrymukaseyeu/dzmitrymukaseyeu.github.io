var btnMenu = document.querySelector('.nav__menu');
var menuLi = document.querySelector('.navigation')
var openMenu = function () {
    menuLi.classList.toggle('_menu__hidden')
};

btnMenu.addEventListener('click', openMenu);