document.addEventListener("DOMContentLoaded", () => {
  identifyRoute();
});

function identifyRoute() {
  const url = window.location.pathname;
  const routeDiv = document.querySelector(".route");
  let content = "";
  if (url.includes("product-list.html")) {
    const totalQuantity = store.getTotalQuantity();
    content = `<p>Carrinho (${totalQuantity} produtos)</p>`;
  }

  if (url.includes("product")) {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const productId = urlParams.get("id");

    if (category) {
      const translatedCategory = translateCategory(category);
      content = `<p>Início / ${translatedCategory}</p>`;
    }else if (productId) {
      const productName = findProductNameById(productId);
      content = `<p>Produto / ${productName}</p>`;
    }
  }

  routeDiv.innerHTML = content;
}

function translateCategory(category) {
  switch (category) {
    case "clothes":
      return "Roupas";
    case "cosmetics":
      return "Cosméticos";
    case "materials":
      return "Materiais";
    case "handmade":
      return "Artesanato";
    case "plants":
      return "Plantas";
    case "furniture":
      return "Móveis";
    default:
      return category;
  }
}

function findProductNameById(productId) {
  const product = products.find((p) => p.id === parseInt(productId));
  return product ? product.title : "Produto não encontrado";
}
