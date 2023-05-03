

const toggleBtn = document.querySelector(".lines-container");
let line1 = document.querySelector(".line1")
let line2 = document.querySelector(".line2")
let line3 = document.querySelector(".line3")

function toggleMenu() {
    const navbarToggle = document.getElementById("main-navbar");
    navbarToggle.classList.toggle("menu-active");
    line1.classList.toggle("active");
    line2.classList.toggle("active");
    line3.classList.toggle("active");
}
toggleBtn.addEventListener("click", toggleMenu);
