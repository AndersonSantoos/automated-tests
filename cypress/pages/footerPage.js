class FooterPage {
  // Elementos do rodapé
  static elements = {
    footer: "footer",
    footerContainer: ".footer-widget > .container",
    subscriptionHeading: ".single-widget > h2",
    subscriptionEmail: "#susbscribe_email",
    subscriptionButton: "#subscribe > .fa",
    subscriptionText: ".searchform > p",
  };

  // Método estático para validar a visibilidade de qualquer elemento
  static validateVisibility(selector, errorMessage) {
    cy.get(selector, { timeout: 20000 })
      .should("exist")
      .should("be.visible")
      .should(($el) => {
        if (!$el.is(":visible")) {
          throw new Error(errorMessage);
        }
      });
  }

  // Método para validar todos os elementos do rodapé
  static validateFooter() {
    Object.keys(this.elements).forEach((key) => {
      const selector = this.elements[key];
      const errorMessage = `${key} não está visível`;
      this.validateVisibility(selector, errorMessage);
    });
  }

  // Métodos específicos para validar cada parte do rodapé
  static validateSubscriptionHeading() {
    this.validateVisibility(
      this.elements.subscriptionHeading,
      "Título da inscrição não está visível"
    );
  }

  static validateSubscriptionEmail() {
    this.validateVisibility(
      this.elements.subscriptionEmail,
      "Campo de e-mail não está visível"
    );
  }

  static validateSubscriptionButton() {
    this.validateVisibility(
      this.elements.subscriptionButton,
      "Botão de inscrição não está visível"
    );
  }

  static validateSubscriptionText() {
    this.validateVisibility(
      this.elements.subscriptionText,
      "Texto de instrução não está visível"
    );
  }
}

export default FooterPage;
