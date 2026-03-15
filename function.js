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

// Scroll events: progress bar + nav active links
window.addEventListener("scroll", () => {
  // 1️⃣ Progress bar
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";

  // 2️⃣ Scroll Spy: Active nav links
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 70; // adjust based on navbar height
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
});