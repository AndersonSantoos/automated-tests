import ProductsPage from "../pages/productsPage";

describe("Testes da Página Inicial - Automation Exercise", () => {
  const pageTitle = "Automation Exercise"; // Título esperado

  beforeEach(() => {
    ProductsPage.visit(); // Visita a página antes de cada teste
  });

  it("Deve validar o layout responsivo em diferentes tamanhos de tela", () => {
    const viewports = [
      { device: "iPhone X", width: 375, height: 812 },
      { device: "iPad", width: 768, height: 1024 },
      { device: "Laptop", width: 1366, height: 768 },
      { device: "Desktop", width: 1920, height: 1080 },
    ];

    ProductsPage.validateResponsiveness(viewports); // Valida o layout responsivo
  });

  it("Deve validar o tempo de carregamento da página", () => {
    ProductsPage.testPageLoadPerformance(); // Valida o tempo de carregamento da página
  });

  it("Deve validar o título da página", () => {
    ProductsPage.validateTitle(pageTitle); // Valida o título da página
  });

  it("Deve validar todos os elementos do cabeçalho", () => {
    ProductsPage.validateHeader(); // Validações do cabeçalho
  });

  it("Deve validar todos os elementos do rodapé", () => {
    ProductsPage.validateFooter(); // Validações do rodapé
  });

  it('Deve exibir o título "All Products" na seção de produtos', () => {
    // Verifica se o título "All Products" está visível
    cy.get(".title.text-center")
      .should("be.visible")
      .and("contain.text", "All Products");
  });

  describe("Testes da Página de Produtos - Automation Exercise", () => {
    const searchTerm = "Men Tshirt";

    beforeEach(() => {
      cy.visit("https://www.automationexercise.com/products");
    });

    it('Deve permitir buscar o produto "Men Tshirt" usando a barra de pesquisa', () => {
      // Realiza a busca pelo produto
      cy.get('input[name="search"]').type(searchTerm); // Digita o termo "Men Tshirt"

      cy.get('button[type="submit"]').click(); // Clica no botão de busca

      // Verifica se o produto "Men Tshirt" está visível nos resultados
      cy.get(
        ":nth-child(4) > .product-image-wrapper > .single-products > .productinfo"
      )
        .should("be.visible") // Valida se o card de produto está visível
        .find("p")
        .should("contain.text", "Men Tshirt"); // Verifica se o nome do produto contém "Men Tshirt"
    });
  });

  // Teste para validar visibilidade de toda a seção de itens
  it("Deve exibir a seção de itens de features", () => {
    cy.get(".features_items").should("be.visible"); // Valida que a seção "features_items" está visível
  });

  // Teste para verificar o primeiro item específico da lista
  it("Deve exibir a imagem do terceiro produto", () => {
    cy.get(
      ".features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > img"
    ).should("be.visible"); // Valida que a imagem do terceiro produto está visível
  });

  // Teste para verificar o título do terceiro produto
  it("Deve exibir o título do terceiro produto", () => {
    cy.get(
      ".features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > h2"
    ).should("be.visible"); // Valida que o título do terceiro produto está visível
  });

  // Teste para verificar a descrição do terceiro produto
  it("Deve exibir a descrição do terceiro produto", () => {
    cy.get(
      ".features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > p"
    ).should("be.visible"); // Valida que a descrição do terceiro produto está visível
  });

  // Teste para verificar o botão de adicionar ao carrinho do terceiro produto
  it('Deve exibir o botão "Add to cart" do terceiro produto', () => {
    cy.get(
      ".features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn"
    ).should("be.visible"); // Valida que o botão "Add to cart" está visível
  });

  it("Deve adicionar e remover um produto do carrinho", () => {
    // Navega para a página de produtos
    ProductsPage.clickProductsLink();

    // Adiciona o terceiro produto ao carrinho
    cy.get(
      ".features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn",
      { timeout: 10000 }
    )
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    // Valida o modal de confirmação
    cy.get(".modal-content", { timeout: 10000 })
      .should("be.visible")
      .within(() => {
        cy.get(".modal-title").should("contain", "Added!");
        cy.get(".modal-body").should(
          "contain",
          "Your product has been added to cart."
        );
        cy.get(".btn-success")
          .should("be.visible")
          .and("not.be.disabled")
          .click(); // Fecha o modal
      });

    // Navega para o carrinho
    ProductsPage.clickCartLink();

    // Espera e verifica se o item do carrinho foi carregado corretamente
    cy.get("#cart_items", { timeout: 10000 }).should("exist").and("be.visible");

    // Valida se o carrinho contém pelo menos um item
    cy.get("#cart_items > :nth-child(1)", { timeout: 10000 })
      .should("exist")
      .and("be.visible"); // Primeiro item do carrinho

    // Remove o produto do carrinho
    cy.get(".cart_quantity_delete > .fa", { timeout: 10000 })
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    // Valida que o carrinho está vazio
    cy.get("#empty_cart > .text-center", { timeout: 10000 }).should(
      "contain",
      "Cart is empty"
    ); // Mensagem de carrinho vazio
  });

  //Teste para verificar o link de adicionar aos favoritos do terceiro produto
  it("Deve exibir o link de adicionar aos favoritos do terceiro produto", () => {
    cy.get(
      ":nth-child(3) > .product-image-wrapper > .choose > .nav > li > a"
    ).should("be.visible"); // Valida que o link de adicionar aos favoritos está visível
  });

  // Teste da barra lateral
  it("Deve exibir a barra lateral esquerda", () => {
    ProductsPage.validateLeftSidebar(); // Valida que a barra lateral esquerda está visível
  });

  it("Deve exibir o primeiro item da barra lateral", () => {
    ProductsPage.validateFirstSidebarItem(); // Valida o primeiro item da barra lateral
  });

  it("Deve exibir o link no primeiro item da barra lateral", () => {
    ProductsPage.validateFirstSidebarLink(); // Valida o link no primeiro item
  });

  it("Deve exibir o badge no primeiro link da barra lateral", () => {
    ProductsPage.validateFirstSidebarLinkBadge(); // Valida o badge do primeiro link
  });

  it("Deve exibir o segundo item da barra lateral", () => {
    ProductsPage.validateSecondSidebarItem(); // Valida o segundo item da barra lateral
  });

  it("Deve exibir o ícone do segundo item da barra lateral", () => {
    ProductsPage.validateSecondSidebarLinkIcon(); // Valida o ícone do segundo item
  });

  it("Deve exibir o ícone do terceiro item da barra lateral", () => {
    ProductsPage.validateThirdSidebarLinkIcon(); // Valida o ícone do terceiro item
  });

  // Testes da seção de marcas de produtos
  it("Deve exibir a seção de marcas de produtos", () => {
    ProductsPage.validateBrandsProductsSection(); // Valida a seção de marcas de produtos
  });

  it("Deve exibir o título da seção de marcas", () => {
    ProductsPage.validateBrandsProductsTitle(); // Valida o título da seção de marcas
  });

  // Valida os links de marcas de 1 a 8
  it("Deve exibir o link de marca 1", () => {
    ProductsPage.validateBrandLink(1); // Valida o link da marca 1
  });

  it("Deve exibir o link de marca 2", () => {
    ProductsPage.validateBrandLink(2); // Valida o link da marca 2
  });

  it("Deve exibir o link de marca 3", () => {
    ProductsPage.validateBrandLink(3); // Valida o link da marca 3
  });

  it("Deve exibir o link de marca 4", () => {
    ProductsPage.validateBrandLink(4); // Valida o link da marca 4
  });

  it("Deve exibir o link de marca 5", () => {
    ProductsPage.validateBrandLink(5); // Valida o link da marca 5
  });

  it("Deve exibir o link de marca 6", () => {
    ProductsPage.validateBrandLink(6); // Valida o link da marca 6
  });

  it("Deve exibir o link de marca 7", () => {
    ProductsPage.validateBrandLink(7); // Valida o link da marca 7
  });

  it("Deve exibir o link de marca 8", () => {
    ProductsPage.validateBrandLink(8); // Valida o link da marca 8
  });

  it("Deve exibir erro para título incorreto", () => {
    cy.title().should("not.include", "Wrong Title"); // Valida título incorreto
  });
});
