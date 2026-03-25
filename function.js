document.addEventListener("DOMContentLoaded", () => {

  // Typed.js
  var typed = new Typed(".typing", {
    strings: [
      "Computer Science Student",
      "Web Developer",
      "Problem Solver",
      "Programming Enthusiast"
    ],
    typeSpeed: 70,
    backSpeed: 50,
    loop: true
  });

  // Custom cursor
  const cursor = document.querySelector(".cursor");
  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Scroll events
  window.addEventListener("scroll", () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 70;
      const sectionHeight = section.clientHeight;

      if (winScroll >= sectionTop && winScroll < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("nav-menu");

// Toggle menu on click
toggle.addEventListener("click", () => {
  menu.classList.toggle("active");

  // optional: toggle hamburger rotation
  toggle.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    toggle.classList.remove("active");
  });
});
  

});