import HeaderPage from "./headerPage"; // Importa o HeaderPage
import FooterPage from "./footerPage"; // Importa o FooterPage

class ContactPage {
  visit() {
    cy.visit("https://www.automationexercise.com/contact_us"); // Visita a página de contato
  }

  validateTitle() {
    cy.title().should("equal", "Automation Exercise - Contact Us"); // Valida o título da página
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

  validateTitleForm() {
    cy.contains("Get In Touch").should("be.visible"); // Valida o título do formulário
  }

  validateForm() {
    cy.get("div.contact-form").should("be.visible"); // Valida que o formulário está visível
  }

  // Métodos para validar os campos individuais do formulário
  validateNameField() {
    cy.get('input[name="name"]').should("be.visible").and("be.enabled"); // Valida o campo de nome
  }

  validateEmailField() {
    cy.get('input[name="email"]').should("be.visible").and("be.enabled"); // Valida o campo de e-mail
  }

  validateSubjectField() {
    cy.get('input[name="subject"]').should("be.visible").and("be.enabled"); // Valida o campo de assunto
  }

  validateMessageField() {
    cy.get('textarea[name="message"]').should("be.visible").and("be.enabled"); // Valida o campo de mensagem
  }

  validateSubmitButton() {
    cy.get('input[type="submit"]').should("be.visible").and("be.enabled"); // Valida o botão de envio
  }

  // Preenche o formulário com dados de teste e envia
  fillAndSubmitForm(formType) {
    cy.fixture("formData").then((formData) => {
      const { name, email, subject, message } = formData[formType];
      cy.get('input[name="name"]').type(name); // Preenche o nome
      cy.get('input[name="email"]').type(email); // Preenche o email
      cy.get('input[name="subject"]').type(subject); // Preenche o assunto
      cy.get('textarea[name="message"]').type(message); // Preenche a mensagem
      cy.get('input[type="submit"]').click(); // Clica no botão de envio
    });
  }

  validateFileUpload(filePath) {
    const fileInputSelector = ":nth-child(6) > .form-control"; // Selecionador do input de arquivo
    cy.get(fileInputSelector).should("be.visible").and("not.have.value"); // Verifica que o campo está visível e vazio

    cy.get(fileInputSelector).attachFile(filePath); // Faz o upload do arquivo

    // Verifica se o campo contém o caminho fictício, indicando que o arquivo foi anexado
    cy.get(fileInputSelector).then((input) => {
      const fileName = input[0].files[0].name;
      expect(fileName).to.equal(filePath.split("/").pop()); // Valida que o arquivo correto foi anexado
    });
  }

  // Teste de Performance
  validatePageLoadTime() {
    cy.window().then((win) => {
      const startTime = new Date().getTime(); // Marca o início do carregamento
      win.onload = () => {
        const endTime = new Date().getTime(); // Marca o fim do carregamento
        const loadTime = endTime - startTime;
        cy.log(`Tempo de carregamento: ${loadTime}ms`); // Loga o tempo de carregamento
        expect(loadTime).to.be.lessThan(2000); // Valida que o tempo de carregamento seja inferior a 2 segundos
      };
    });
  }

  // Teste de Responsividade
  validateResponsiveness() {
    const screenSizes = [
      { name: "Desktop", width: 1200, height: 800 },
      { name: "Tablet", width: 768, height: 1024 },
      { name: "Mobile", width: 375, height: 667 },
    ];

    screenSizes.forEach(({ name, width, height }) => {
      cy.viewport(width, height); // Define o tamanho da tela
      cy.log(`Verificando responsividade em ${name}`); // Loga o tamanho da tela
      this.validateHeader(); // Valida o cabeçalho
      this.validateFooter(); // Valida o rodapé
      this.validateForm(); // Valida o formulário
    });
  }

  // Método para submeter o formulário vazio e validar as mensagens de erro
  submitEmptyFormAndValidateError() {
    cy.get('input[name="email"]').then(($input) => {
      const validationMessage = $input[0].validationMessage;
      expect(validationMessage).to.eq("Preencha este campo."); // Adiciona o ponto final
    });
  }
}

export default new ContactPage();
