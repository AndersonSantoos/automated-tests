import SingupPage from "../pages/singupPage";

describe("Testes na página de cadastro - Automation Exercise", () => {
  const existingEmail = "anderson@teste.com"; // E-mail fixo para o teste de "email já existente"

  beforeEach(() => {
    cy.visit("https://www.automationexercise.com/login");
  });

  it("Deve validar o título da página", () => {
    SingupPage.validateTitle(); // Valida o título da página
  });

  it("Deve validar todos os elementos do cabeçalho", () => {
    SingupPage.validateHeader(); // Validações do cabeçalho
  });

  it("Deve validar todos os elementos do rodapé", () => {
    SingupPage.validateFooter(); // Validações do rodapé
  });

  it("Deve cadastrar um novo usuário com dados válidos", () => {
    cy.fixture("singupData").then((data) => {
      const uniqueEmail = `user_${Date.now()}@example.com`; // Gera um e-mail único
      cy.get('[data-qa="signup-name"]').type("Teste Usuário");
      cy.get('[data-qa="signup-email"]').type(uniqueEmail);
      cy.get('[data-qa="signup-button"]').click();
      cy.url().should("include", "/signup");

      SingupPage.firstName(data.validUser.firstName);
      SingupPage.lastName(data.validUser.lastName);
      SingupPage.company(data.validUser.company);
      SingupPage.fillEmail(uniqueEmail); // Usa o e-mail único gerado
      SingupPage.fillPassword(data.validUser.password);
      SingupPage.fillAddress(data.validUser.address);
      SingupPage.fillCity(data.validUser.city);
      SingupPage.selectState(data.validUser.state);
      SingupPage.fillZipCode(data.validUser.zip);
      SingupPage.fillPhone(data.validUser.phone);
      SingupPage.submit();
      SingupPage.validateSuccess();
    });
  });

  it("Deve mostrar erro ao tentar cadastrar com e-mail já existente", () => {
    cy.fixture("singupData").then((data) => {
      cy.get('[data-qa="signup-name"]').type("Teste Usuário"); // Nome do usuário
      cy.get('[data-qa="signup-email"]').type(data.existingEmail); // Usa o e-mail existente da fixture
      cy.get('[data-qa="signup-button"]').click(); // Clica no botão de cadastro
      cy.get(".signup-form > form > p", { timeout: 10000 }) // Seleciona a mensagem de erro
        .should("be.visible") // Verifica se está visível
        .and("contain.text", "Email Address already exist!"); // Valida o texto da mensagem
    });
  });

  it("Deve mostrar erro ao tentar cadastrar com um e-mail inválido", () => {
    cy.fixture("singupData").then((data) => {
      cy.get('[data-qa="signup-name"]').type(data.invalidUser.firstName); // Nome do usuário
      cy.get('[data-qa="signup-email"]').type(data.invalidUser.email); // E-mail inválido
      cy.get('[data-qa="signup-button"]').click(); // Clica no botão de cadastro

      // Verifica a mensagem flutuante de erro (alerta)
      cy.on("window:alert", (text) => {
        expect(text).to.contain("Invalid email address!"); // Substitua pelo texto correto do alerta
      });
    });
  });

  //Teste de Performance
  it("Deve validar o desempenho da página", () => {
    SingupPage.validatePerformance();
  });

  // Teste de Responsividade
  it("Deve validar o layout responsivo", () => {
    const viewports = [
      { device: "Mobile", width: 320, height: 800 },
      { device: "Tablet", width: 768, height: 1024 },
      { device: "Desktop", width: 1280, height: 800 },
    ];

    SingupPage.validateResponsiveness(viewports); // Passando a lista de objetos corretamente
  });
});
