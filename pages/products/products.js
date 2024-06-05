document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initializeCart();
});

let lastValidSubtotal = 0.0;

function renderProducts() {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  const urlParams = new URLSearchParams(window.location.search);
  const productCategory = urlParams.get("category");

  const filteredProducts = products.filter(
    (product) => product.category === productCategory
  );

  if (filteredProducts.length > 0) {
    filteredProducts.forEach((product) => {
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
        <div class="container-sale" style="${
          product.sale === 0 ? "display: none;" : ""
        }"><p>-${product.sale}%</p></div>
        <img src="${product.image}" alt="${product.description}">
        <h2>${product.title}</h2>
        <p class="price">R$${product.price}</p>
        <div class="container-buttons">
        <a href="../product-details/product-details.html?id=${
          product.id
        }"><button class="btn-hover-white")>Ver produto</button></a>
        <div class="buttons">
            <button class="add" onclick="handleAddToCart(${
              product.id
            })"><span class="material-symbols-outlined">
            add_shopping_cart
            </span></button>
        </div>
        </div>
      `;
      container.appendChild(productCard);
    });
  } else {
    container.innerHTML = "<p>Produto não encontrado.</p>";
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

