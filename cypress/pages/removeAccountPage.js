class AccountDeletePage {
  // Método para visitar a página inicial
  visit() {
    cy.visit("https://www.automationexercise.com");
  }

  // Método para realizar login na aplicação
  login(email, senha) {
    cy.visit("https://www.automationexercise.com/login");
    cy.get('input[data-qa="login-email"]').type(email); // Digita o email
    cy.get('input[data-qa="login-password"]').type(senha); // Digita a senha
    cy.get('button[data-qa="login-button"]').click(); // Clica no botão de login
  }

  // Método para validar se o login foi bem-sucedido
  validateLogin() {
    cy.contains("Logged in as Anderson TESTER QA").should("be.visible");
  }

  // Método para clicar no botão de "Delete Account"
  deleteAccount() {
    // Clica no link "Delete Account" baseado no href
    cy.get('a[href="/delete_account"]').should("be.visible").click();
  }

  // Método para validar se a conta foi deletada
  validateAccountDeleted() {
    // Verifica se a mensagem "Account Deleted!" está visível
    cy.contains("Account Deleted!").should("be.visible");
    // Verifica se o botão "Continue" está visível
    cy.get('[data-qa="continue-button"]').should("be.visible").click();
    // Verifica se o usuário foi redirecionado para a página inicial
    cy.url().should("include", "/");
  }
}

export default new AccountDeletePage();
