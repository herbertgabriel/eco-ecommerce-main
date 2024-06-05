document.addEventListener("DOMContentLoaded", () => {
  const adressDiv = document.querySelector(".adress");
  const infosPaymentsDiv = document.querySelector(".infos-payments");
  const cart = document.querySelector(".cart");
  const confirmDiv = document.querySelector(".confirm");

  createForm();

  function createForm() {
    adressDiv.innerHTML = `
      <h1>Entrega</h1>
      <form id="address-form">
        <div class="container-input">
          <label for="full-name">Nome Completo*</label>
          <input type="text" id="full-name" name="full-name" required>
        </div>

        <div class="container-input">
          <label for="phone">Nº Telefone*</label>
          <input type="text" id="phone" name="phone" required>
        </div>

        <div class="container-input">
          <label for="cep">CEP*</label>
          <input type="text" id="cep" name="cep" required>
        </div>

        <div class="container-input">
          <label for="state">Estado*</label>
          <input type="text" id="state" name="state" required>
        </div>

        <div class="container-input">
          <label for="city">Cidade *</label>
          <input type="text" id="city" name="city" required>
        </div>

        <div class="container-input">
          <label for="address">Endereço *</label>
          <input type="text" id="address" name="address" required>
        </div>

        <div class="container-input">
          <label for="address">Número *</label>
          <input type="text" id="address" name="address" required>
        </div>

        <div class="container-input">
          <label for="address">Complemento *</label>
          <input type="text" id="address" name="address" required>
        </div>

        <div class="container-input">
          <label for="address">Referência *</label>
          <input type="text" id="address" name="address" required>
        </div>
      </form>
    `;

    infosPaymentsDiv.innerHTML = `
      <h1>Informações de Pagamento</h1>
      <section class="payment-options-section">
        <button type="button" class="payment-option" id="card">Cartão</button>
        <button type="button" class="payment-option" id="paypal">PayPal</button>
        <button type="button" class="payment-option" id="pix">Pix</button>
        <button type="button" class="payment-option" id="boleto">Boleto</button>
      </section>
      <div id="payment-form-container"></div>
    `;

    cart.innerHTML = `
      <div class="cart-container">
        <ul id="cartList-products"></ul>
        <h3 id="subtotal-cart"></h3>
      </div>
      <div class="buttons">
        <button type="button" id="back-to-address" class="btn-hover-white">Cancelar</button>
        <button type="button" id="confirm-payment" class="add">Confirmar</button>
      </div>
    `;

    document
      .querySelectorAll(".payment-option")
      .forEach((button) => {
        button.addEventListener("click", handlePaymentOptionClick);
      });

    renderCartInPaymentOptions();
  }

  function renderCartInPaymentOptions() {
    const cartListProducts = document.getElementById("cartList-products");
    const subtotalCart = document.getElementById("subtotal-cart");
    cartListProducts.innerHTML = "";
    let subtotal = 0;

    store.state.cart.forEach((product) => {
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `
          <h3>${product.quantity}x ${product.title}</h3>
          <p>R$${product.price.toFixed(2)}</p>
        `;
      cartListProducts.appendChild(cartItem);
      subtotal += product.price * product.quantity;
    });

    subtotalCart.innerHTML = `<h3>Total</h3>
    <p>R$${subtotal.toFixed(2)}</p>`;
  }

  function handlePaymentOptionClick(event) {
    const paymentFormContainer = document.getElementById(
      "payment-form-container"
    );
    const selectedOption = event.target.id;

    paymentFormContainer.innerHTML = "";

    if (selectedOption === "card") {
      paymentFormContainer.innerHTML = `
          <h2>Pagamento com Cartão</h2>
          <form id="card-form">
          <div class="container-input">
            <label for="card-name">Nome do Titular*</label>
            <input type="text" id="card-name" name="card-name" required>
          </div>
          <div class="container-input">
              <label for="card-number">Número do Cartão*</label>
              <input type="text" id="card-number" name="card-number" required>
          </div>
          <div class="container-input">
            <label for="card-expiry">Validade*</label>
            <input type="text" id="card-expiry" name="card-expiry" required>
          </div>
          <div class="container-input">
            <label for="card-cvv">CVV*</label>
            <input type="text" id="card-cvv" name="card-cvv" required>
            </div>
            <div class="container-input">
            <div class="container-input-parcelas">
            <label for="installments">Parcelas*</label>
            <select id="installments" name="installments" required>
              <option value="1">1 parcela</option>
              <option value="2">2 parcelas</option>
              <option value="3">3 parcelas</option>
              <option value="4">4 parcelas</option>
              <option value="5">5 parcelas</option>
              <option value="6">6 parcelas</option>
              <option value="7">7 parcelas</option>
              <option value="8">8 parcelas</option>
              <option value="9">9 parcelas</option>
              <option value="10">10 parcelas</option>
              <option value="11">11 parcelas</option>
              <option value="12">12 parcelas</option>
            </select>
            </div>
            </div>
          </form>
        `;
    } else if (selectedOption === "paypal") {
      paymentFormContainer.innerHTML = `
          <h2>Pagamento com PayPal</h2>
          <button type="button" id="paypal-button" class="button-continue">Pagar com PayPal</button>
        `;
    } else if (selectedOption === "pix") {
      paymentFormContainer.innerHTML = `
          <h2>Pagamento com Pix</h2>
          <img src="./images/pix-qr-code.png" alt="QR Code Pix">
        `;
    } else if (selectedOption === "boleto") {
      paymentFormContainer.innerHTML = `
          <h2>Pagamento com Boleto</h2>
          <img src="./images/boleto.png" alt="Boleto">
        `;
    }

    document
      .getElementById("confirm-payment")
      ?.addEventListener("click", showConfirmation);
  }

  function showConfirmation() {
    const infosPaymentsDiv = document.querySelector(".infos-payments");
    const confirmDiv = document.querySelector(".confirm");
    const cart = document.querySelector(".cart");

    infosPaymentsDiv.style.display = "none";
    adressDiv.style.display = "none";
    cart.style.display = "none";

    const fullName = document.getElementById("full-name").value;
    const address = document.getElementById("address").value;

    confirmDiv.innerHTML = `
        <div class="confirmDiv">
          <h1>${fullName}, seu pedido foi realizado! </br>
          Acesse seu email para mais informações.</h1>
          <p class="mensage">Será entregue no endereço: ${address} <br> em até 90 dias úteis</p>
          <div class="buttons">
            <button type="button" class="btn-hover-white">Visualizar pedido</button>
            <button type="button" class="btn-hover-white">Rastrear pedido</button>
          </div>
        </div>
        <div class="voltar">
          <a href="../../../index.html"><button type="button" class="add">Voltar pra Página Inicial</button></a>
        </div>
      `;
  }
});
