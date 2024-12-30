import HeaderPage from "./headerPage"; // Importa o HeaderPage
import FooterPage from "./footerPage"; // Importa o FooterPage

class SingupPage {
  // Valida o título da página de cadastro
  validateTitle() {
    cy.title().should("equal", "Automation Exercise - Signup / Login");
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

  // Métodos para preencher o formulário de cadastro
  firstName(name) {
    cy.get('[data-qa="first_name"]', { timeout: 10000 })
      .should("be.visible")
      .type(name);
  }

  lastName(lastName) {
    cy.get('[data-qa="last_name"]').type(lastName);
  }

  company(companyName) {
    cy.get('[data-qa="company"]').type(companyName);
  }

  fillEmail(email) {
    cy.get('[data-qa="email"]').type(email, { force: true });
  }

  fillPassword(password) {
    cy.get('[data-qa="password"]').type(password);
  }

  fillAddress(address) {
    cy.get('[data-qa="address"]').type(address);
  }

  fillCity(city) {
    cy.get('[data-qa="city"]').type(city);
  }

  selectState(state) {
    cy.get('[data-qa="state"]').type(state);
  }

  fillZipCode(zip) {
    cy.get('[data-qa="zipcode"]').type(zip);
  }

  fillPhone(phone) {
    cy.get('[data-qa="mobile_number"]').type(phone);
  }

  // Submete o formulário de cadastro
  submit() {
    cy.get('[data-qa="create-account"]').click();
  }

  // Valida se a conta foi criada com sucesso
  validateSuccess() {
    cy.get('[data-qa="account-created"]', { timeout: 15000 })
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("Account Created!");
      });
  }

  // Teste de performance
  validatePerformance() {
    cy.window().then((window) => {
      const startTime = window.performance.now();
      cy.reload();
      cy.window().then((window) => {
        const endTime = window.performance.now();
        const loadTime = endTime - startTime;
        cy.log(`Tempo de carregamento: ${loadTime}ms`);
        expect(loadTime).to.be.lessThan(5000); // Tempo máximo esperado: 5 segundos
      });
    });
  }

  // Método para testar a responsividade
  validateResponsiveness(viewports) {
    viewports.forEach(({ device, width, height }) => {
      cy.viewport(width, height); // Define o viewport
      cy.reload(); // Recarrega a página para aplicar o layout
      cy.log(`Validando o layout responsivo para: ${device}`);

      // Aguarda o carregamento do cabeçalho
      cy.get("body", { timeout: 15000 }).should("be.visible");

      // Verifica se o elemento existe antes de tentar validá-lo
      cy.get("header", { timeout: 15000 })
        .should("exist")
        .within(() => {
          cy.get(".logo", { timeout: 15000 }).should("be.visible");
        });

      // Validações do rodapé
      cy.get("footer", { timeout: 15000 }).should("be.visible");
    });
  }
}

export default new SingupPage();
