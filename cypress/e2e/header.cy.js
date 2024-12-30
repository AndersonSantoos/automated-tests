import HeaderPage from "../pages/headerPage"; // Importa o HeaderPage

describe("Testes de Header", () => {
  beforeEach(() => {
    cy.visit("https://www.automationexercise.com"); // Visita a página inicial antes de cada teste
    cy.wait(2000); // Espera 2 segundos para garantir que a página carregue completamente
  });

  it("Deve validar a visibilidade do logo", () => {
    HeaderPage.validateLogo(); // Valida a visibilidade do logo
  });

  it("Deve validar os links de navegação", () => {
    HeaderPage.validateNavigationMenu(); // Valida a visibilidade do menu de navegação
  });

  it("Deve validar os links do cabeçalho", () => {
    // Iterando sobre os links e validando cada um
    Object.keys(HeaderPage.elements.links).forEach((link) => {
      HeaderPage.validateLink(link); // Valida cada link do cabeçalho
    });
  });
});
