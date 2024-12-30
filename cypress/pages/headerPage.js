class HeaderPage {
  // Elementos do cabeçalho
  static elements = {
    logo: "a > img", // Logo, seletor para a imagem dentro de um link
    navigationMenu: ".shop-menu > .nav", // Menu de navegação
    links: {
      home: ".shop-menu > .nav > :nth-child(1) > a", // Link "Home"
      products: ".shop-menu > .nav > :nth-child(2) > a", // Link "Products"
      cart: ".shop-menu > .nav > :nth-child(3)", // Link "Cart" (sem <a>, apenas o item de navegação)
      contact: ".shop-menu > .nav > :nth-child(4) > a", // Link "Contact"
      logout: ".shop-menu > .nav > :nth-child(5) > a", // Link "Logout"
      anotherLink: ".shop-menu > .nav > :nth-child(6) > a", // Outro link (exemplo: uma seção adicional)
      extraLink: ".shop-menu > .nav > :nth-child(8) > a", // Link extra (se necessário)
    },
  };

  // Valida a visibilidade do logo
  static validateLogo() {
    cy.get(this.elements.logo, { timeout: 10000 }).should("be.visible");
  }

  // Valida o menu de navegação
  static validateNavigationMenu() {
    cy.get(this.elements.navigationMenu, { timeout: 10000 }).should(
      "be.visible"
    );
  }

  // Valida a visibilidade de um link
  static validateLink(link) {
    cy.get(this.elements.links[link], { timeout: 10000 }).should("be.visible");
  }
}

export default HeaderPage;
