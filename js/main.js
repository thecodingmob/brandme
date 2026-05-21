const nav = document.getElementById("navLinks");
const menu = document.getElementById("menuToggle");

menu.addEventListener("click", () => {
  nav.classList.toggle("open");
});
