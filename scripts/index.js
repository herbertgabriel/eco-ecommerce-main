document.addEventListener("DOMContentLoaded", () => {
    initializeCart();
  });
  
let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');
let slideIndex = 1;
let timeoutID;
const showSlides = (n) => {
let i;
if (n > slides.length) {
        slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < slides.length; i++) {
                dots[i].setAttribute('class', 'dot');
            }
            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].setAttribute('class', 'dot ativo');
            clearTimeout(timeoutID);
            timeoutID = setTimeout(autoSlides, 4000);
        };
        const plusSlides = (n) => {
            showSlides(slideIndex += n);
        };
        const currentSlide = (n) => {
            showSlides(slideIndex = n);
        };
        function autoSlides() {
            let i;
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            for (i = 0; i < slides.length; i++) {
                dots[i].setAttribute('class', 'dot');
            }
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].setAttribute('class', 'dot ativo');
            timeoutID = setTimeout(autoSlides, 4000);
        }
        autoSlides();



// Carrinho //

  let lastValidSubtotal = 0.00;
  function handleAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      store.addToCart(product);
      renderCart();
      showPopup("Item adicionado ao carrinho!", true);
    }
  }
  
  function handleRemoveFromCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      store.removeFromCart(product);
      renderCart();
      showPopup("Item removido do carrinho!", false);
    }
  }
  
  function initializeCart() {
    const cartToggle = document.getElementById("cartToggle");
    const cartAside = document.getElementById("cartAside");
    const closeCartButton = document.querySelector(".close-button");
  
    closeCartButton.addEventListener("click", () => {
      cartAside.classList.remove("show");
    });
  
    cartToggle.addEventListener("click", () => {
      cartAside.classList.toggle("show");
    });
  
    renderCart();
  }
  
  function renderCart() {
    const cartList = document.getElementById("cartList");
    const subtotalElement = document.getElementById("subtotal-cartAside");
    cartList.innerHTML = '';
    
    let subtotal = 0;
    store.state.cart.forEach(product => {
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `
        <section>
          <div>
          <div class="container-sale" style="${
            product.sale === 0 ? "display: none;" : ""
          }"><p>-${product.sale}%</p></div>
            <h3 class="product-title-cart">${product.title}</h3> <p class="product-price-cart">R$${product.price}</p>
            <div class="quantidade">
              <p class="text-quantidade">Quantidade</p>
              <input type="number" min="1" value="${product.quantity}" class="quantity" data-id="${product.id}">
            </div>
          </div>
          <button class="remove" onclick="handleRemoveFromCart(${product.id})">X</button>
        </section>
      `;
      
      cartList.appendChild(cartItem);
      subtotal += product.price * product.quantity;
    });
  
    if (isNaN(subtotal)) {
      subtotal = lastValidSubtotal; 
    } else {
      lastValidSubtotal = subtotal;
    }
  
    subtotalElement.textContent = `Subtotal: R$${subtotal.toFixed(2)}`;
    updateCartQuantities();
  }
  
  function updateCartQuantities() {
    const quantityInputs = document.querySelectorAll(".quantity");
    quantityInputs.forEach(input => {
      input.addEventListener("change", (e) => {
        const productId = parseInt(e.target.getAttribute("data-id"));
        const product = products.find(p => p.id === productId);
        if (product) {
          const quantity = parseInt(e.target.value);
          store.updateCartQuantity(product, quantity);
          renderCart();
        }
      });
    });
  }
