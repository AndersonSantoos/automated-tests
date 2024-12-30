import accountDeletePage from "../pages/removeAccountPage"; // Importa o Page Object

describe("Testes de exclusão de conta - Automation Exercise", () => {
  beforeEach(() => {
    accountDeletePage.visit(); // Visita a página inicial antes de cada teste
  });

  it("Deve realizar login e validar que está logado", () => {
    cy.fixture("loginData").then((loginData) => {
      accountDeletePage.login(loginData.validEmail, loginData.validPassword); // Realiza o login
      accountDeletePage.validateLogin(); // Verifica se o login foi bem-sucedido
    });
  });

  it("Deve deletar a conta e validar a exclusão", () => {
    cy.fixture("loginData").then((loginData) => {
      accountDeletePage.login(loginData.validEmail, loginData.validPassword); // Realiza o login
      accountDeletePage.validateLogin(); // Verifica se está logado
      accountDeletePage.deleteAccount(); // Clica para deletar a conta
      accountDeletePage.validateAccountDeleted(); // Verifica se a conta foi deletada com sucesso
    });
  });
});
