const hamBtn = document.getElementsByClassName("ham-icon")[0];
const navbarLink = document.getElementsByClassName("navbar-links")[0];

hamBtn.addEventListener("click", () => {
    navbarLink.classList.toggle('active');
})
