console.log("SoulScape started");

/* ---------------- NAV ACTIVE ON SCROLL ---------------- */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(sec => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const top = window.scrollY;

    if (top >= offset && top < offset + height) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
});

/* ---------------- BACK TO TOP ---------------- */
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTopBtn.style.display =
    window.scrollY > 300 ? "flex" : "none";
});

backToTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------------- HAMBURGER MENU ---------------- */
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector("nav ul");

hamburger?.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});
