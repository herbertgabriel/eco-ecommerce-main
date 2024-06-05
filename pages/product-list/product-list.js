document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutCart();
});

function renderCheckoutCart() {
  const cartList = document.getElementById("cartList-products");
  const subtotalElement = document.getElementById("subtotal-cart");
  cartList.innerHTML = "";

  let subtotal = 0;
  store.state.cart.forEach((product) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
     
        <div class="cart-item-details">
        <img src="${product.image}" alt="${
      product.title
    }" class="cart-item-image">
        <div class="cart-items">
        <div>
            <h2>${product.title}</h2>
            <h3>${product.description}</h3>
        </div>
        <div class="quantity">
        <h2>Quantidade</h2>
        <input type="number" min="1" value="${product.quantity}" data-id="${
      product.id
    }">
</div>
          <div class="price">
          <h2>Preço</h2>
          <h3 class="product-price-cart">R$${product.price.toFixed(
            2
          )}</h3> </div>
         
        <div><button class="remove" onclick="handleRemoveFromCart(${
          product.id
        })">X</button></div>
        </div>
    `;
    cartList.appendChild(cartItem);
    subtotal += product.price * product.quantity;
  });

  subtotalElement.innerHTML = `
  <h2>Subtotal: R$${subtotal.toFixed(2)}</h2>
  <h1>Total: R$${subtotal.toFixed(2)}</h1>
  <div class="concluir-compra">
    <a href="/index.html">ESCOLHER MAIS PRODUTOS</a>
    <a href="../login/login.html" class="finish">Concluir compra</a>
  </div>
  `;
  updateCartQuantities();
}

function handleRemoveFromCart(productId) {
  const product = store.state.cart.find((p) => p.id === productId);
  if (product) {
    store.removeFromCart(product);
    renderCheckoutCart();
    showPopup("Item removido do carrinho!", false);
  }
}

function updateCartQuantities() {
  const quantityInputs = document.querySelectorAll(".quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = store.state.cart.find((p) => p.id === productId);
      if (product) {
        const quantity = parseInt(e.target.value);
        if (quantity > 0) {
          store.updateCartQuantity(product, quantity);
          renderCheckoutCart();
        }
      }
    });
  });
}