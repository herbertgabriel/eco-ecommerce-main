document.addEventListener("DOMContentLoaded", () => {
  const adressDiv = document.querySelector(".adress");
  const infosPaymentsDiv = document.querySelector(".infos-payments");
  const cart = document.querySelector(".cart");
  const confirmDiv = document.querySelector(".confirm");

  createForm();

  function createForm() {
    adressDiv.innerHTML = `
      <fieldset>
        <legend>Entrega</legend>
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
            <label for="number">Número *</label>
            <input type="text" id="number" name="number" required>
          </div>

          <div class="container-input">
            <label for="complement">Complemento</label>
            <input type="text" id="complement" name="complement">
          </div>

          <div class="container-input">
            <label for="reference">Referência *</label>
            <input type="text" id="reference" name="reference" required>
          </div>
        </form>
      </fieldset>
    `;

    infosPaymentsDiv.innerHTML = `
      <fieldset>
        <legend>Forma de Pagamento</legend>
        <section class="payment-options-section">
          <button type="button" class="payment-option" id="card">Cartão</button>
          <button type="button" class="payment-option" id="paypal">PayPal</button>
          <button type="button" class="payment-option" id="pix">Pix</button>
          <button type="button" class="payment-option" id="boleto">Boleto</button>
        </section>
        <div id="payment-form-container"></div>
      </fieldset>
    `;

    cart.innerHTML = `
      <div class="cart-container">
        <ul id="cartList-products"></ul>
        <h3 id="subtotal-cart"></h3>
      </div>
      <div class="buttons">
        <button type="button" id="back-to-address" class="btn-hover-white"><a href=".././product-list/product-list.html">Cancelar</a></button>
        <button type="button" id="confirm-payment" class="btn-hover-white">Confirmar</button>
      </div>
    `;

    document
      .querySelectorAll(".payment-option")
      .forEach((button) => {
        button.addEventListener("click", handlePaymentOptionClick);
      });

    document
      .getElementById("confirm-payment")
      ?.addEventListener("click", showConfirmation);

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
              <option value="1">1x (Sem juros)</option>
              <option value="2">2x (Sem juros)</option>
              <option value="3">3x (Sem juros)</option>
              <option value="4">4x (Sem juros)</option>
              <option value="5">5x (Sem juros)</option>
              <option value="6">6x (Sem juros)</option>
              <option value="7">7x</option>
              <option value="8">8x</option>
              <option value="9">9x</option>
              <option value="10">10x</option>
              <option value="11">11x</option>
              <option value="12">12x</option>
            </select>
            </div>
            </div>
          </form>
        `;
    } else if (selectedOption === "paypal") {
      paymentFormContainer.innerHTML = `
          <h2>Pagamento com PayPal</h2>
          <button type="button" id="paypal-button" class="button-continue"></button>
        `;
    } else if (selectedOption === "pix") {
      paymentFormContainer.innerHTML = `
          <h2>Pagamento com Pix</h2>
          <img src="./imgs/qr-code.png" alt="QR Code Pix" id="pixis">
        `;
    } else if (selectedOption === "boleto") {
      paymentFormContainer.innerHTML = `
          <h2>Pagamento com Boleto</h2>
          <img src="./imgs/boleto.png" alt="Boleto" id="boletus">
        `;
    }

    document
      .getElementById("confirm-payment")
      ?.addEventListener("click", showConfirmation);
  }

  function showConfirmation() {
    const addressForm = document.getElementById("address-form");
    const cardForm = document.getElementById("card-form");

    // Remove previous error styles
    addressForm.querySelectorAll("input").forEach(input => input.classList.remove("invalid"));
    addressForm.querySelectorAll("label").forEach(label => label.classList.remove("invalid-label"));
    if (cardForm) {
      cardForm.querySelectorAll("input").forEach(input => input.classList.remove("invalid"));
      cardForm.querySelectorAll("label").forEach(label => label.classList.remove("invalid-label"));
    }

    let hasErrors = false;

    addressForm.querySelectorAll("input[required]").forEach(input => {
      const label = addressForm.querySelector(`label[for="${input.id}"]`);
      if (input.value.trim() === "") {
        input.classList.add("invalid");
        if (label) label.classList.add("invalid-label");
        hasErrors = true;
      }
    });

    if (document.getElementById("card")?.classList.contains("selected")) {
      cardForm.querySelectorAll("input[required]").forEach(input => {
        const label = cardForm.querySelector(`label[for="${input.id}"]`);
        if (input.value.trim() === "") {
          input.classList.add("invalid");
          if (label) label.classList.add("invalid-label");
          hasErrors = true;
        }
      });
    }

    if (hasErrors) {
      console.log("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const fullName = document.getElementById("full-name").value;
    const address = document.getElementById("address").value;

    infosPaymentsDiv.style.display = "none";
    adressDiv.style.display = "none";
    cart.style.display = "none";

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
          <a href="../../../index.html"><button type="button"class="btn-hover-white">Voltar pra Página Inicial</button></a>
        </div>
      `;
  }
});
