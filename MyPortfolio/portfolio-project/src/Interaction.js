import { useEffect } from "react";
import Typed from "typed.js"; // make sure you install it: npm i typed.js

export default function Interaction() {   // or whatever your component is called
  useEffect(() => {
    // ---------- Preloader ----------
    const preloader = document.getElementById("page-preloader");
    if (preloader) {
      const hidePreloader = () => {
        preloader.classList.add("is-hidden");
        document.body.classList.remove("preloader-active");

        preloader.addEventListener(
          "transitionend",
          (e) => {
            if (e.propertyName === "opacity") {
              preloader.remove();
            }
          },
          { once: true }
        );
      };

      if (document.readyState === "complete") {
        requestAnimationFrame(hidePreloader);
      } else {
        window.addEventListener("load", hidePreloader, { once: true });
      }
    }

    // ---------- Typed.js ----------
    const typed = new Typed(".typing", {
      strings: [
        "Computer Science Student",
        "Web Developer",
        "Problem Solver",
        "Programming Enthusiast",
      ],
      typeSpeed: 70,
      backSpeed: 50,
      loop: true,
    });

    // ---------- Custom cursor ----------
    const cursor = document.querySelector(".cursor");
    const moveCursor = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", moveCursor);

    // ---------- Scroll progress + active nav ----------
    const handleScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;

      const progressBar = document.getElementById("progress-bar");
      if (progressBar) {
        progressBar.style.width = scrolled + "%";
      }

      // Active nav link
      const sections = document.querySelectorAll("section");
      const navLinks = document.querySelectorAll(".nav-link");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 70;
        const sectionHeight = section.clientHeight;
        if (
          winScroll >= sectionTop &&
          winScroll < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // ---------- Mobile menu ----------
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("nav-menu");

    const toggleMenu = () => {
      menu?.classList.toggle("active");
      toggle?.classList.toggle("active");
    };

    const closeMenu = () => {
      menu?.classList.remove("active");
      toggle?.classList.remove("active");
    };

    toggle?.addEventListener("click", toggleMenu);

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    const handleOutsideClick = (e) => {
      if (
        menu &&
        toggle &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("click", handleOutsideClick);

    // ---------- Cleanup ----------
    return () => {
      typed.destroy();
      document.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", handleScroll);
      toggle?.removeEventListener("click", toggleMenu);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

}