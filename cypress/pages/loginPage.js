import HeaderPage from "./headerPage"; // Importa o HeaderPage
import FooterPage from "./footerPage"; // Importa o FooterPage

class LoginPage {
  // Acessa a página de login
  visit() {
    cy.visit("https://www.automationexercise.com/login");
  }

  validateTitle() {
    cy.title().should("equal", "Automation Exercise - Signup / Login"); // Valida o título da página
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

  // Preenche o campo de e-mail
  fillEmail(email) {
    if (email) {
      cy.get('[data-qa="login-email"]').type(email);
    }
  }

  // Preenche o campo de senha
  fillPassword(password) {
    if (password) {
      cy.get('[data-qa="login-password"]').type(password);
    }
  }

  // Submete o formulário de login
  submitLogin() {
    cy.get('[data-qa="login-button"]').click();
  }

  // Valida se o login foi bem-sucedido
  validateLoginSuccess() {
    cy.url().should("include", "/account");
  }

  // Valida a presença de mensagem de erro de forma flexível
  validateErrorMessage(message) {
    cy.contains(message, { timeout: 6000 }).should("be.visible");
  }

  // Clica no link "Signup"
  clickSignupLink() {
    cy.contains("New User Signup!").click();
  }

  // Método para validar se o usuário está logado
  validateUserLoggedIn() {
    // Verifica se o nome do usuário aparece no cabeçalho
    cy.get(":nth-child(10) > a").should("contain.text", "Logged in as"); // Substitua pelo nome do usuário
  }

  // Método para validar o tempo de carregamento da página
  validatePageLoadTime() {
    const startTime = Date.now(); // Marca o tempo inicial
    cy.visit("https://www.automationexercise.com/login").then(() => {
      const loadTime = Date.now() - startTime; // Calcula o tempo de carregamento
      cy.log(`Tempo de carregamento: ${loadTime}ms`); // Exibe o tempo de carregamento no log
      expect(loadTime).to.be.lessThan(5000); // Define um limite de 5 segundos para o carregamento
    });
  }

  // Método para validar a responsividade
  validateResponsiveLayout() {
    const breakpoints = [320, 768, 1024, 1440]; // Tamanhos de tela para testar
    breakpoints.forEach((size) => {
      cy.viewport(size, 768); // Altera o tamanho da tela
      cy.visit("https://www.automationexercise.com/login"); // Visita a página
      cy.get("body").should("be.visible"); // Verifica se a página está visível após o redimensionamento
    });
  }
}

export default new LoginPage();
