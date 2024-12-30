import logoutPage from "../pages/logoutPage";

describe("Testes na página de logout - Automation Exercise", () => {
  beforeEach(() => {
    logoutPage.visit();
  });

  it("Deve validar todos os elementos do cabeçalho", () => {
    logoutPage.validateHeader(); // Validações do cabeçalho
  });

  it("Deve validar todos os elementos do rodapé", () => {
    logoutPage.validateFooter(); // Validações do rodapé
  });

  it("Deve realizar login na aplicação", () => {
    cy.fixture("loginData").then((loginData) => {
      logoutPage.login(loginData.validEmail, loginData.validPassword); // Realiza login
    });
  });

  it("Deve confirmar se está logado", () => {
    cy.fixture("loginData").then((loginData) => {
      logoutPage.login(loginData.validEmail, loginData.validPassword);
      logoutPage.validateVisibilityLogin();
    });
  });

  it("Deve realizar logout", () => {
    cy.fixture("loginData").then((loginData) => {
      logoutPage.login(loginData.validEmail, loginData.validPassword);
      logoutPage.clickLogout();
    });
  });

  // Teste de desempenho
  it("Deve validar o tempo de carregamento da página", () => {
    logoutPage.validatePageLoadTime(); // Teste de desempenho
  });

  // Teste de responsividade
  it("Deve validar a responsividade da página em diferentes tamanhos de tela", () => {
    logoutPage.validateResponsiveLayout(); // Teste de responsividade
  });
});
