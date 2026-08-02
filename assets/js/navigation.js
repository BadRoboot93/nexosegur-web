const navigationToggle = document.querySelector(".navigation-toggle");
const primaryNavigation = document.querySelector(".primary-navigation");
const navigationLinks = document.querySelectorAll(".primary-navigation a");

if (navigationToggle && primaryNavigation) {
  const closeNavigation = () => {
    navigationToggle.setAttribute("aria-expanded", "false");
    navigationToggle.setAttribute("aria-label", "Abrir menú de navegación");

    primaryNavigation.classList.remove("is-open");
  };

  navigationToggle.addEventListener("click", () => {
    const isOpen = navigationToggle.getAttribute("aria-expanded") === "true";

    navigationToggle.setAttribute("aria-expanded", String(!isOpen));

    navigationToggle.setAttribute(
      "aria-label",
      isOpen ? "Abrir menú de navegación" : "Cerrar menú de navegación",
    );

    primaryNavigation.classList.toggle("is-open", !isOpen);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      closeNavigation();
    }
  });
}
