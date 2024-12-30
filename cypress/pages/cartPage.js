import HeaderPage from "./headerPage"; // Importa o HeaderPage
import FooterPage from "./footerPage"; // Importa o FooterPage

class CartPage {
  visit() {
    cy.visit("https://www.automationexercise.com/view_cart");
  }

  validateTitle() {
    cy.title().should("equal", "Automation Exercise - Checkout"); // Valida o título da página
  }

  // Método para validar o cabeçalho
  validateHeader() {
    HeaderPage.validateLogo(); // Valida o logo
    HeaderPage.validateNavigationMenu(); // Valida o menu de navegação
    // Iterando sobre os links e validando cada um
    Object.keys(HeaderPage.elements.links).forEach((link) => {
      HeaderPage.validateLink(link); // Valida cada link do cabeçalho
    });
  }

  // Método para validar o rodapé
  validateFooter() {
    // Itera sobre os elementos do rodapé definidos no objeto FooterPage.elements
    Object.entries(FooterPage.elements).forEach(([key, selector]) => {
      FooterPage.validateVisibility(selector, `${key} não está visível`); // Passa o seletor correto
    });
  }

  login(email, senha) {
    cy.visit("https://www.automationexercise.com/login");
    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(senha);
    cy.get('button[data-qa="login-button"]').click();
  }

  addProductToCart() {
    cy.visit("https://www.automationexercise.com/product_details/1"); // Acessa o produto Blue Top
    cy.get("button").contains("Add to cart").click();
    cy.get(".modal-footer > .btn").should("be.visible").click(); // Clica no botão do modal
  }

  validateCartTable() {
    cy.get(".product-information").should("contain", "Blue Top");
    cy.get(":nth-child(5) > span").should("contain", "Rs. 500");
    cy.get("#quantity").should("have.value", "1");
    cy.get(":nth-child(5) > span").should("contain", "Rs. 500");
  }

  proceedToCheckout() {
    cy.visit("https://www.automationexercise.com/view_cart");
    cy.get(".col-sm-6 > .btn").contains("Proceed To Checkout").click();
  }

  validateCustomerDetails() {
    cy.get(".checkout-information").should("be.visible");
  }

  placeOrder() {
    cy.get(":nth-child(7) > .btn").contains("Place Order").click();
  }

  fillCardDetails(name, cardNumber, cvc, expiration) {
    cy.get('[data-qa="name-on-card"]').type(name);
    cy.get('[data-qa="card-number"]').type(cardNumber);
    cy.get('[data-qa="cvc"]').type(cvc);
    cy.get('[data-qa="expiry-month"]').type(expiration.month);
    cy.get('[data-qa="expiry-year"]').type(expiration.year);
    cy.get('[data-qa="pay-button"]').contains("Pay and Confirm Order").click();
  }

  validateOrderConfirmation() {
    cy.get('[data-qa="order-placed"] > b')
      .invoke("text") // Obtém o texto real do elemento
      .then((text) => {
        expect(text.trim()).to.eq("Order Placed!"); // Remove espaços antes de comparar
      });

    cy.get(".col-sm-9 > p")
      .invoke("text")
      .then((text) => {
        // Normaliza o texto removendo espaços extras e compara com o esperado
        const normalizedText = text.trim();
        expect(normalizedText).to.be.oneOf([
          "Congratulations! Your order has been placed successfully!",
          "Congratulations! Your order has been confirmed!",
        ]);
      });

    // Verifica e interage com o botão de continuar
    cy.get('[data-qa="continue-button"]', { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "Continue")
      .click();
  }

  // Método para validar o layout responsivo
  validateResponsiveness(viewports) {
    viewports.forEach(({ device, width, height }) => {
      cy.viewport(width, height);
      cy.reload();
      cy.log(`Validando o layout responsivo para: ${device}`);
      cy.get("header").should("be.visible");
      cy.get("footer").should("be.visible");
    });
  }

  // Método para validar o tempo de carregamento
  testPageLoadPerformance() {
    cy.window().then((window) => {
      const startTime = window.performance.now();
      this.visit(); // Chama o método para visitar a página do carrinho
      cy.window().then((window) => {
        const endTime = window.performance.now();
        const loadTime = endTime - startTime;
        cy.log(`Tempo de carregamento da página: ${loadTime}ms`);
        expect(loadTime).to.be.lessThan(5000); // Tempo de carregamento esperado
      });
    });
  }
}

export default new CartPage();
