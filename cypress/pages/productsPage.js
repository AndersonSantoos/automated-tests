import HeaderPage from "./headerPage"; // Importa o HeaderPage
import FooterPage from "./footerPage"; // Importa o FooterPage

class ProductsPage {
  // Visita a página principal
  visit() {
    cy.visit("https://www.automationexercise.com/products");
  }

  // Valida o título da página principal
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

  // Clica no link "Products" e valida a navegação
  clickProductsLink() {
    cy.contains("Products").click();
    cy.url().should("include", "/products");
  }

  clickCartLink() {
    cy.contains("Cart").click();
    cy.url().should("include", "/view_cart");
  }

  clickTestCasesLink() {
    cy.contains("Test Case").click();
    cy.url().should("include", "/test_cases");
  }

  clickApiListLink() {
    cy.contains("API Testing").click();
    cy.url().should("include", "/api_list");
  }

  clickContactUsLink() {
    cy.contains("Contact us").click();
    cy.url().should("include", "/contact_us");
  }

  // Método para realizar a busca de produto
  searchProduct(searchTerm) {
    cy.get('input[name="search"]').should("be.visible").type(searchTerm); // Digita o termo na barra de pesquisa
    cy.get('button[type="submit"]').should("be.visible").click(); // Clica no botão de busca
  }

  // Método para validar os resultados da busca (sem verificar a URL)
  validateSearchResults(searchTerm) {
    // Verifica se a lista de produtos contém o termo de pesquisa
    cy.get(".features_items").should("be.visible"); // Valida a visibilidade dos itens
    cy.get(".productinfo").each(($product) => {
      cy.wrap($product).should("contain.text", searchTerm); // Valida que cada produto contém o termo de busca
    });
  }

  validateFeaturesItemsTitle() {
    // Valida que a seção "features_items" está visível
    cy.get(".features_items").should("be.visible");
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

  removeProductFromCart(index) {
    // Seleciona o botão de remover produto pelo índice da linha
    cy.get(
      `.cart_info_table tbody tr:nth-child(${index}) .cart_quantity_delete`,
      { timeout: 10000 }
    )
      .should("be.visible")
      .and("not.be.disabled") // Garante que o botão está habilitado
      .click();

    // Aguarda o item ser removido
    cy.get(`.cart_info_table tbody tr:nth-child(${index})`, {
      timeout: 10000,
    }).should("not.exist");
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

  // Método para validar a responsividade
  validateResponsiveness(viewports) {
    viewports.forEach(({ device, width, height }) => {
      cy.viewport(width, height); // Define o viewport
      cy.reload(); // Recarrega a página para aplicar o layout
      cy.log(`Validando o layout responsivo para: ${device}`);

      // Aguarda o carregamento do cabeçalho
      cy.get("body", { timeout: 15000 }).should("be.visible");

      // Verifica se o cabeçalho e o rodapé estão visíveis
      cy.get("header", { timeout: 15000 })
        .should("exist")
        .within(() => {
          cy.get(".logo", { timeout: 15000 }).should("be.visible");
        });
      cy.get("footer", { timeout: 15000 }).should("be.visible");
    });
  }

  // Teste de performance: tempo de resposta da página
  testPageLoadPerformance() {
    cy.window().then((window) => {
      const startTime = window.performance.now();
      cy.visit("https://www.automationexercise.com/products");
      cy.window().then((window) => {
        const endTime = window.performance.now();
        const loadTime = endTime - startTime;
        cy.log(`Page load time: ${loadTime}ms`);
        expect(loadTime).to.be.lessThan(5000); // A página deve carregar em menos de 5 segundos
      });
    });
  }
}

export default new ProductsPage();
