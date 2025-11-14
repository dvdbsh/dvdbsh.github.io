/* Header and nav behaviour */
const header = document.querySelector(".header");
const mainNavigation = document.querySelector(".main-navigation");
const menuIcon = document.querySelector(".menu-icon");
const closeMenuIcon = document.querySelector(".close-menu");
const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownContent = document.querySelector(".dropdown-content");

let lastScrollTop = 0;

/* Hide header on scroll */
window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    header.style.top = "-100%";
    mainNavigation.classList.add("fixed");
  } else {
    header.style.top = "0";
    mainNavigation.classList.remove("fixed");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

/* Mobile menu open/close */
function closeMobileMenu() {
  mainNavigation.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

menuIcon.addEventListener("click", () => {
  if (mainNavigation.classList.contains("open")) {
    closeMobileMenu();
  } else {
    mainNavigation.classList.add("open");
    document.body.classList.add("no-scroll");
  }
});

closeMenuIcon.addEventListener("click", closeMobileMenu);

document.addEventListener("click", (event) => {
  const clickedInside =
    mainNavigation.contains(event.target) || menuIcon.contains(event.target);

  if (!clickedInside && mainNavigation.classList.contains("open")) {
    closeMobileMenu();
  }
});

/* Close on leaf link only */
document.querySelectorAll(".main-navigation a").forEach((link) => {
  link.addEventListener("click", () => {
    const parent = link.parentElement;
    const hasSubMenu =
      parent.querySelector(".submenu") || parent.querySelector(".sub-links");

    if (!hasSubMenu && window.innerWidth <= 900) {
      closeMobileMenu();
    }
  });
});

/* Desktop submenu */
document.querySelectorAll(".menu-item > a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const parent = link.parentElement;
    const submenu = parent.querySelector(".submenu");

    if (!submenu) return;

    event.preventDefault();

    document.querySelectorAll(".submenu").forEach((other) => {
      if (other !== submenu) other.classList.remove("open");
    });

    submenu.classList.toggle("open");
  });
});

/* Desktop nested submenu */
document.querySelectorAll(".submenu-item > a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const parent = link.parentElement;
    const subLinks = parent.querySelector(".sub-links");

    if (!subLinks) return;

    event.preventDefault();

    document.querySelectorAll(".sub-links").forEach((other) => {
      if (other !== subLinks) other.classList.remove("open");
    });

    subLinks.classList.toggle("open");
  });
});

/* Dropdown local nav */
if (dropdownBtn) {
  dropdownBtn.addEventListener("click", () => {
    dropdownContent.classList.toggle("show");
  });
}

document.querySelectorAll(".dropdown-content a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }

    dropdownContent.classList.remove("show");
  });
});
