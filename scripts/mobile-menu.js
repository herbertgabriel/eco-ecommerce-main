document.addEventListener('DOMContentLoaded', function() {
   const menuToggleHamburger = document.querySelector('.hamburger-menu');
   const categorias = document.querySelector('.categorias');
 
   function addHamburgerMenuButton() {
     const hamburgerButton = document.createElement('button');
     hamburgerButton.className = 'hamburger-button';
     hamburgerButton.innerHTML = '&#9776;';
     menuToggleHamburger.appendChild(hamburgerButton);
 
     hamburgerButton.addEventListener('click', function() {
       categorias.classList.toggle('active');
     });
   }
 
   function removeHamburgerMenuButton() {
     const hamburgerButton = document.querySelector('.hamburger-menu');
     if (hamburgerButton) {
       hamburgerButton.remove();
     }
   }
 
   function handleWindowResize() {
     if (window.innerWidth <= 768) {
       addHamburgerMenuButton();
     } else {
       removeHamburgerMenuButton();
     }
   }
 
   handleWindowResize();
 
   window.addEventListener('resize', handleWindowResize);
 });
 