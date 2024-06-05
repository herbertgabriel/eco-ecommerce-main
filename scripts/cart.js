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
  const quantityCart = document.querySelector(".quantity-cart");
  const cartList = document.getElementById("cartList");
  const subtotalElement = document.getElementById("subtotal-cartAside");
  cartList.innerHTML = "";
  const totalQuantity = store.getTotalQuantity();


  let subtotal = 0;

  store.state.cart.forEach((product) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
    <section>
      <div>
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
  quantityCart.textContent = `Carrinho (${totalQuantity} itens)`;
  updateCartQuantities();
}

function updateCartQuantities() {
  const quantityInputs = document.querySelectorAll(".quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      if (product) {
        const quantity = parseInt(e.target.value);
        store.updateCartQuantity(product, quantity);
        renderCart();
      }
    });
  });
}

