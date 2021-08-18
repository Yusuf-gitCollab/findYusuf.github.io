var navBar = document.getElementById("navBar");
var sticky = navBar.offsetTop;

window.onscroll = stickNav;

function stickNav() {
    if(window.pageYOffset >= sticky) {
        navBar.classList.add("sticky");
    }else {
        navBar.classList.remove("sticky");
    }
}