document.addEventListener("DOMContentLoaded", function () {
  const menuToggleHamburger = document.querySelector(".hamburger-menu");
  const categorias = document.querySelector(".categorias");

  function addHamburgerMenuButton() {
    if (!menuToggleHamburger.querySelector(".hamburger-button")) {
      const hamburgerButton = document.createElement("button");
      hamburgerButton.className = "hamburger-button";
      hamburgerButton.innerHTML = "&#9776;";
      menuToggleHamburger.appendChild(hamburgerButton);

      hamburgerButton.addEventListener("click", function () {
        categorias.classList.toggle("active");
      });
    }
  }

  function removeHamburgerMenuButtons() {
    const hamburgerButtons = document.querySelectorAll(".hamburger-button");
    hamburgerButtons.forEach((button) => button.remove());
  }

  function handleWindowResize() {
    if (window.innerWidth <= 920) {
      addHamburgerMenuButton();
    } else {
      removeHamburgerMenuButtons();
      categorias.classList.remove("active");
    }
  }

  handleWindowResize();

  window.addEventListener("resize", handleWindowResize);
});