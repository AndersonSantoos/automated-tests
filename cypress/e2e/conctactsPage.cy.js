import ContactPage from "../pages/Contact_usPage"; // Importa a página de contato

describe("Testes da Página de Contato - Automation Exercise", () => {
  beforeEach(() => {
    ContactPage.visit(); // Visita a página de contato antes de cada teste
  });

  it("Deve validar o título da página", () => {
    ContactPage.validateTitle(); // Valida o título da página
  });

  it("Deve validar todos os elementos do cabeçalho", () => {
    ContactPage.validateHeader(); // Validações do cabeçalho
  });

  it("Deve validar todos os elementos do rodapé", () => {
    ContactPage.validateFooter(); // Validações do rodapé
  });

  it("Deve validar o título do formulário", () => {
    ContactPage.validateTitleForm(); // Valida o título do formulário
  });

  it("Deve verificar visibilidade do formulário de contato", () => {
    ContactPage.validateForm(); // Verifica se o formulário de contato está visível
  });

  it("Deve validar a visibilidade e habilitação dos campos do formulário", () => {
    ContactPage.validateNameField(); // Valida o campo de nome
    ContactPage.validateEmailField(); // Valida o campo de e-mail
    ContactPage.validateSubjectField(); // Valida o campo de assunto
    ContactPage.validateMessageField(); // Valida o campo de mensagem
    ContactPage.validateSubmitButton(); // Valida o botão de envio
  });

  it("Deve fazer o upload de um arquivo", () => {
    const filePath = "exampleFile.txt"; // Nome do arquivo na pasta fixtures
    ContactPage.validateFileUpload(filePath);
  });

  // Teste de Performance
  it("Deve medir o tempo de carregamento da página", () => {
    cy.wait(2000); // Aguarda um pouco para garantir que a página tenha carregado completamente
    ContactPage.validatePageLoadTime();
  });

  // Teste de Responsividade
  it("Deve validar a responsividade da página em diferentes tamanhos de tela", () => {
    ContactPage.validateResponsiveness();

    // Valida que o cabeçalho é visível em diferentes tamanhos de tela
    cy.get("header").should("be.visible");

    // Valida que o rodapé é visível em diferentes tamanhos de tela
    cy.get("footer").should("be.visible");
  });

  it("Deve garantir que o contraste do texto no cabeçalho seja adequado", () => {
    cy.get("header")
      .should("have.css", "color")
      .and("not.be", "rgb(255, 255, 255)"); // Verifica que a cor não é branca
  });
});
