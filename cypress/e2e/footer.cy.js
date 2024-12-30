import FooterPage from "../pages/footerPage";

describe("Testes do Rodapé", () => {
  beforeEach(() => {
    cy.visit("https://www.automationexercise.com");
    cy.wait(2000); // Aguarda o carregamento completo da página
  });

  it("Deve validar a visibilidade de todos os elementos do rodapé", () => {
    FooterPage.validateFooter();
  });

  it("Deve validar os links de inscrição do rodapé", () => {
    FooterPage.validateSubscriptionHeading();
    FooterPage.validateSubscriptionEmail();
    FooterPage.validateSubscriptionButton();
    FooterPage.validateSubscriptionText();
  });

  it("Deve validar que o rodapé está presente na página", () => {
    FooterPage.validateVisibility(
      FooterPage.elements.footer,
      "Rodapé não está visível"
    );
  });

  it("Deve validar o container do rodapé", () => {
    FooterPage.validateVisibility(
      FooterPage.elements.footerContainer,
      "Container do rodapé não está visível"
    );
  });
});
