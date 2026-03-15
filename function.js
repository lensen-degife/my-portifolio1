    
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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


window.onscroll = function() {

let winScroll = document.body.scrollTop || document.documentElement.scrollTop;

let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

let scrolled = (winScroll / height) * 100;

document.getElementById("progress-bar").style.width = scrolled + "%";
};

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e=>{
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});