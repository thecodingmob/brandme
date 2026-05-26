const nav = document.getElementById("navLinks");
const menu = document.getElementById("menuToggle");

menu.addEventListener("click", () => {
  const icon = menu.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
  nav.classList.toggle("open");
});
