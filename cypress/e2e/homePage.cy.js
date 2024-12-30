import HomePage from "../pages/homePage";

describe("Testes da Página Inicial - Automation Exercise", () => {
  const pageTitle = "Automation Exercise"; // Título esperado

  beforeEach(() => {
    HomePage.visit(); // Visita a página antes de cada teste
  });

  it("Deve validar o título da página", () => {
    HomePage.validateTitle(pageTitle); // Valida o título da página
  });

  it("Deve validar todos os elementos do cabeçalho", () => {
    HomePage.validateHeader(); // Validações do cabeçalho
  });

  it("Deve validar todos os elementos do rodapé", () => {
    HomePage.validateFooter(); // Validações do rodapé
  });

  it('Deve exibir o título "Features" na seção de Features Items', () => {
    HomePage.validateFeaturesItemsTitle(); // Valida o título da seção de recursos
  });

  // Teste para validar visibilidade de toda a seção de itens
  it("Deve exibir a seção de itens de features", () => {
    cy.get(".features_items").should("be.visible"); // Valida que a seção "features_items" está visível
  });

  //Teste para verificar o primeiro item específico da lista
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

  //Teste para verificar a descrição do terceiro produto
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

  //Teste para verificar o link de adicionar aos favoritos do terceiro produto
  it("Deve exibir o link de adicionar aos favoritos do terceiro produto", () => {
    cy.get(
      ":nth-child(3) > .product-image-wrapper > .choose > .nav > li > a"
    ).should("be.visible"); // Valida que o link de adicionar aos favoritos está visível
  });

  // Teste da barra lateral
  it("Deve exibir a barra lateral esquerda", () => {
    HomePage.validateLeftSidebar(); // Valida que a barra lateral esquerda está visível
  });

  it("Deve exibir o primeiro item da barra lateral", () => {
    HomePage.validateFirstSidebarItem(); // Valida o primeiro item da barra lateral
  });

  it("Deve exibir o link no primeiro item da barra lateral", () => {
    HomePage.validateFirstSidebarLink(); // Valida o link no primeiro item
  });

  it("Deve exibir o badge no primeiro link da barra lateral", () => {
    HomePage.validateFirstSidebarLinkBadge(); // Valida o badge do primeiro link
  });

  it("Deve exibir o segundo item da barra lateral", () => {
    HomePage.validateSecondSidebarItem(); // Valida o segundo item da barra lateral
  });

  it("Deve exibir o ícone do segundo item da barra lateral", () => {
    HomePage.validateSecondSidebarLinkIcon(); // Valida o ícone do segundo item
  });

  it("Deve exibir o ícone do terceiro item da barra lateral", () => {
    HomePage.validateThirdSidebarLinkIcon(); // Valida o ícone do terceiro item
  });

  // Testes da seção de marcas de produtos
  it("Deve exibir a seção de marcas de produtos", () => {
    HomePage.validateBrandsProductsSection(); // Valida a seção de marcas de produtos
  });

  it("Deve exibir o título da seção de marcas", () => {
    HomePage.validateBrandsProductsTitle(); // Valida o título da seção de marcas
  });

  // Valida os links de marcas de 1 a 8
  it("Deve exibir o link de marca 1", () => {
    HomePage.validateBrandLink(1); // Valida o link da marca 1
  });

  it("Deve exibir o link de marca 2", () => {
    HomePage.validateBrandLink(2); // Valida o link da marca 2
  });

  it("Deve exibir o link de marca 3", () => {
    HomePage.validateBrandLink(3); // Valida o link da marca 3
  });

  it("Deve exibir o link de marca 4", () => {
    HomePage.validateBrandLink(4); // Valida o link da marca 4
  });

  it("Deve exibir o link de marca 5", () => {
    HomePage.validateBrandLink(5); // Valida o link da marca 5
  });

  it("Deve exibir o link de marca 6", () => {
    HomePage.validateBrandLink(6); // Valida o link da marca 6
  });

  it("Deve exibir o link de marca 7", () => {
    HomePage.validateBrandLink(7); // Valida o link da marca 7
  });

  it("Deve exibir o link de marca 8", () => {
    HomePage.validateBrandLink(8); // Valida o link da marca 8
  });

  it("Deve exibir erro para título incorreto", () => {
    cy.title().should("not.include", "Wrong Title"); // Valida título incorreto
  });

  it("Deve carregar a página rapidamente", () => {
    HomePage.testPageLoadPerformance(); // Teste de performance
  });

  // Testes de responsividade
  it("Deve funcionar corretamente em diferentes tamanhos de tela", () => {
    const viewports = [
      { width: 1280, height: 720 }, // Tamanho de tela de desktop
      { width: 375, height: 667 }, // Tamanho de tela de celular (iphone-6)
      { width: 768, height: 1024 }, // Tamanho de tela de tablet (ipad-2)
    ];

    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height); // Ajusta o tamanho da tela
      HomePage.visit(); // Visita a página em diferentes tamanhos de tela
      HomePage.validateTitle(pageTitle); // Valida o título após o redimensionamento
    });
  });

  it("Deve validar a acessibilidade do logo", () => {
    HomePage.validateLogoAccessibility(); // Verifica se o logo tem o atributo 'alt' definido e não está vazio
  });

  it("Não deve exibir o título incorreto", () => {
    HomePage.validateTitleIsNotIncorrect(); // Verifica que o título não é "Wrong Title"
  });

  it("Deve exibir a seção 'Features' mesmo sem produtos", () => {
    HomePage.validateFeaturesSectionWithoutProducts(); // Verifica se a seção 'Features' está visível mesmo sem produtos
  });
});
