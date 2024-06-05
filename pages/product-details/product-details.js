document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initializeCart();
});

let lastValidSubtotal = 0.0;

function renderProducts() {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  if (product) {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const stars = Array.from({ length: 5 })
      .map((_, index) => {
        return `<span class="star">${
          index < Math.round(product.rating.rate) ? "★" : "☆"
        }</span>`;
      })
      .join("");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.description}">
      <div class="informations">
        <h2>${product.title}</h2>
        <p class="description">${product.description}</p>
        <section class="rating">
          <div class="stars"><p>(${product.rating.rate})</p> ${stars}</div>
          <div class="count"><p>${product.rating.count} Avaliações</p>
        </section>
        <div class="buy-card">
          <div class="price">
            <p class="preço">R$${product.price} no PIX</p>
            <p class="parcelado">ou ${product.price} em até 5x sem juros</p>
          </div>
          <div class="icon">
            <span class="material-symbols-outlined">favorite</span>
          </div>
          <div class="buttons">
            <button class="add" onclick="handleAddToCart(${product.id})"><a href="../product-list/product-list.html" >Comprar</a></button>
            <button class="add" onclick="handleAddToCart(${product.id})">Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>
     `;

    container.appendChild(productCard);
  } else {
    container.innerHTML = "<p>Produto não encontrado!</p>";
  }
}

function handleAddToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    store.addToCart(product);
    renderCart();
    showPopup("Item adicionado ao carrinho!", true);
  }
}

function handleRemoveFromCart(productId) {
  const product = products.find((p) => p.id === productId);
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
  cartList.innerHTML = "";

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
