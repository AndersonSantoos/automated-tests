import CartPage from "../pages/cartPage";

describe("Testes na página de carrinho - Automation Exercise", () => {
  beforeEach(() => {
    CartPage.visit();
  });

  it("Deve validar o título da página", () => {
    CartPage.validateTitle(); // Valida o título da página
  });

  it("Deve validar todos os elementos do cabeçalho", () => {
    CartPage.validateHeader(); // Validações do cabeçalho
  });

  it("Deve validar todos os elementos do rodapé", () => {
    CartPage.validateFooter(); // Validações do rodapé
  });

  it("Deve realizar login, adicionar produto ao carrinho, validar tabela e concluir compra", () => {
    cy.fixture("loginData").then((loginData) => {
      CartPage.login(loginData.validEmail, loginData.validPassword); // Realiza login
    });

    CartPage.addProductToCart(); // Adiciona produto ao CartPage
    CartPage.validateCartTable(); // Valida informações do produto
    CartPage.proceedToCheckout(); // Prossegue para o checkout
    CartPage.validateCustomerDetails(); // Verifica os detalhes do cliente
    CartPage.placeOrder(); // Confirma a ordem

    cy.fixture("cartData").then((data) => {
      CartPage.fillCardDetails(
        data.cardDetails.name,
        data.cardDetails.number,
        data.cardDetails.cvc,
        data.cardDetails.expiration
      ); // Dados do cartão
    });
    CartPage.validateOrderConfirmation(); // Confirmação do pedido
  });

  it("Deve validar o layout responsivo em diferentes tamanhos de tela", () => {
    const viewports = [
      { device: "iPhone X", width: 375, height: 812 },
      { device: "iPad", width: 768, height: 1024 },
      { device: "Laptop", width: 1366, height: 768 },
      { device: "Desktop", width: 1920, height: 1080 },
    ];
    CartPage.validateResponsiveness(viewports); // Valida o layout responsivo
  });

  it("Deve validar o tempo de carregamento da página de carrinho", () => {
    CartPage.testPageLoadPerformance(); // Valida o tempo de carregamento
  });
});
