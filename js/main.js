const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".menuToggle");

// navToggle.addEventListener("click", () => {
//   const visibility = primaryNav.getAttribute("data-visible");
//   if (visibility === "false") {
//     primaryNav.setAttribute("data-visible", true);
//     navToggle.setAttribute("aria-expanded", true);
//   } else if (visibility === "true") {
//     primaryNav.setAttribute("data-visible", false);
//     navToggle.setAttribute("aria-expanded", false);
//   }
// });

function toggleMenu() {
  const visibility = primaryNav.getAttribute("data-visible");

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
}

navToggle.addEventListener("click", toggleMenu);

document.addEventListener("click", (e) => {
  if (!e.target.closest(".primary-navigation, .menuToggle")) {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});
