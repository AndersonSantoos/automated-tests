import HeaderPage from "./headerPage"; // Importa o HeaderPage
import FooterPage from "./footerPage"; // Importa o FooterPage

class LogoutPage {
  // Método para visitar a página
  visit() {
    cy.visit("https://www.automationexercise.com");
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

  // Método para realizar login na aplicação
  login(email, senha) {
    cy.visit("https://www.automationexercise.com/login");
    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(senha);
    cy.get('button[data-qa="login-button"]').click();
  }

  // Método para validar se o login foi bem-sucedido
  validateVisibilityLogin() {
    cy.contains(" Logged in as Anderson TESTER QA").should("be.visible");
  }

  // Método para clicar no botão de logout
  clickLogout() {
    cy.contains("Logout").should("be.visible").click();
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

  // Método para validar a responsividade da página em diferentes tamanhos de tela
  validateResponsiveLayout() {
    const breakpoints = [320, 768, 1024, 1440]; // Tamanhos de tela para testar
    breakpoints.forEach((size) => {
      cy.viewport(size, 768); // Altera o tamanho da tela
      cy.visit("https://www.automationexercise.com"); // Visita a página
      cy.get("body").should("be.visible"); // Verifica se a página está visível após o redimensionamento
    });
  }
}

export default new LogoutPage();
