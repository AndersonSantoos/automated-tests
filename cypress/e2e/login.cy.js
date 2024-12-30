import loginPage from "../pages/loginPage";

describe("Testes na página de login - Automation Exercise", () => {
  beforeEach(() => {
    loginPage.visit(); // Acessa a página de login antes de cada teste
  });

  it("Deve validar o título da página", () => {
    loginPage.validateTitle(); // Valida o título da página
  });

  it("Deve validar todos os elementos do cabeçalho", () => {
    loginPage.validateHeader(); // Valida os elementos do cabeçalho
  });

  it("Deve validar todos os elementos do rodapé", () => {
    loginPage.validateFooter(); // Valida os elementos do rodapé
  });

  it("Deve fazer login corretamente com credenciais válidas", () => {
    cy.fixture("loginData").then((data) => {
      loginPage.fillEmail(data.validEmail); // Preenche o e-mail válido
      loginPage.fillPassword(data.validPassword); // Preenche a senha válida
      loginPage.submitLogin(); // Submete o login

      // Valida que o usuário está logado
      loginPage.validateUserLoggedIn(); // Verifica se o nome do usuário está visível
    });
  });

  it("Deve mostrar erro ao tentar fazer login com credenciais inválidas", () => {
    cy.fixture("loginData").then((data) => {
      loginPage.fillEmail(data.invalidEmail); // Preenche o e-mail inválido
      loginPage.fillPassword(data.invalidPassword); // Preenche a senha inválida
      loginPage.submitLogin(); // Submete o login

      // Valida se a mensagem de erro aparece
      loginPage.validateErrorMessage("Your email or password is incorrect!"); // Valida a mensagem de erro
    });
  });

  it("Deve validar o tempo de carregamento da página", () => {
    loginPage.validatePageLoadTime(); // Teste de desempenho
  });

  it("Deve validar a responsividade da página em diferentes tamanhos de tela", () => {
    loginPage.validateResponsiveLayout(); // Teste de responsividade
  });
});
