import HeaderPage from "./headerPage"; // Importa o HeaderPage
import FooterPage from "./footerPage"; // Importa o FooterPage

class HomePage {
  // Visita a página principal
  visit() {
    cy.visit("https://www.automationexercise.com");
  }

  // Valida o título da página
  validateTitle(expectedTitle) {
    cy.title().should("include", expectedTitle);
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

  validateFeaturesItemsTitle() {
    cy.get(".features_items > .title")
      .should("be.visible")
      .and("contain", "Features");
  }

  // Interações e validações para a seção 'features_items'
  validateFeatureItemsSection() {
    cy.get(".features_items").should("be.visible"); // Valida que a seção "features_items" está visível
  }

  validateFeatureItemImage(index) {
    cy.get(
      `.features_items > :nth-child(${index}) > .product-image-wrapper > .single-products > .productinfo > img`
    ).should("be.visible"); // Valida a visibilidade da imagem do item
  }

  validateFeatureItemTitle(index) {
    cy.get(
      `.features_items > :nth-child(${index}) > .product-image-wrapper > .single-products > .productinfo > h2`
    ).should("be.visible"); // Valida a visibilidade do título do item
  }

  validateFeatureItemDescription(index) {
    cy.get(
      `.features_items > :nth-child(${index}) > .product-image-wrapper > .single-products > .productinfo > p`
    ).should("be.visible"); // Valida a visibilidade da descrição do item
  }

  validateFeatureItemButton(index) {
    cy.get(
      `.features_items > :nth-child(${index}) > .product-image-wrapper > .single-products > .productinfo > .btn`
    ).should("be.visible"); // Valida a visibilidade do botão "Add to Cart" do item
  }

  validateFeatureItemFavoritesLink(index) {
    cy.get(
      `.features_items > :nth-child(${index}) > .product-image-wrapper > .choose > .nav > li > a`
    ).should("be.visible"); // Valida a visibilidade do link de adicionar aos favoritos
  }

  // Valida a visibilidade da barra lateral
  validateLeftSidebar() {
    cy.get(".left-sidebar").should("be.visible");
  }

  // Valida o primeiro item da barra lateral
  validateFirstSidebarItem() {
    cy.get(".left-sidebar > :nth-child(1)").should("be.visible");
  }

  // Valida o link dentro do primeiro item da barra lateral
  validateFirstSidebarLink() {
    cy.get(":nth-child(1) > .panel-heading > .panel-title > a").should(
      "be.visible"
    );
  }

  // Valida o badge dentro do primeiro link
  validateFirstSidebarLinkBadge() {
    cy.get(":nth-child(1) > .panel-heading > .panel-title > a > .badge").should(
      "be.visible"
    );
  }

  // Valida o segundo item da barra lateral
  validateSecondSidebarItem() {
    cy.get(":nth-child(2) > .panel-heading > .panel-title > a").should(
      "be.visible"
    );
  }

  // Valida o ícone dentro do segundo item da barra lateral
  validateSecondSidebarLinkIcon() {
    cy.get(
      ":nth-child(2) > .panel-heading > .panel-title > a > .badge > .fa"
    ).should("be.visible");
  }

  // Valida o ícone do terceiro item da barra lateral
  validateThirdSidebarLinkIcon() {
    cy.get(
      ":nth-child(3) > .panel-heading > .panel-title > a > .badge > .fa"
    ).should("be.visible");
  }

  // Valida a seção de marcas de produtos
  validateBrandsProductsSection() {
    cy.get(".brands_products").should("be.visible");
  }

  // Valida o título da seção de marcas
  validateBrandsProductsTitle() {
    cy.get(".brands_products > h2").should("be.visible");
  }

  // Valida os links de marcas (1 a 8)
  validateBrandLink(index) {
    cy.get(`.brands-name > .nav > :nth-child(${index}) > a`).should(
      "be.visible"
    );
  }

  // Teste de performance: tempo de resposta da página
  testPageLoadPerformance() {
    cy.window().then((window) => {
      const startTime = window.performance.now();
      cy.visit("https://www.automationexercise.com");
      cy.window().then((window) => {
        const endTime = window.performance.now();
        const loadTime = endTime - startTime;
        expect(loadTime).to.be.lessThan(5000); // A página deve carregar em menos de 5 segundos
      });
    });
  }

  // Valida a acessibilidade do logo
  validateLogoAccessibility() {
    cy.get(".logo img").should("have.attr", "alt").and("not.be.empty"); // Verifica se a imagem do logo tem o atributo 'alt' e não está vazio
  }

  validateTitleIsNotIncorrect() {
    cy.title().should("not.include", "Wrong Title"); // Valida que o título não deve ser "Wrong Title"
  }

  validateFeaturesSectionWithoutProducts() {
    cy.get(".features_items").should("be.visible"); // Verifica se a seção de "Features" está visível
    cy.get(".features_items > .product-image-wrapper").should("not.exist"); // Verifica que não há produtos
  }
}

export default new HomePage();
