# Automação de Testes E2E para o Site Automation Exercise

## Objetivo do Projeto
Este projeto tem como objetivo automatizar o processo de testes End-to-End (E2E) para o site **Automation Exercise**, uma plataforma de e-commerce. Utilizando o framework **Cypress**, foram criados testes que cobrem funcionalidades críticas e garantem a qualidade da aplicação, incluindo verificação de funcionalidades como login, logout, adição de produtos ao carrinho, processo de checkout, remoção de conta, validação de cabeçalho e rodapé, e outras validações de elementos essenciais, além de validações de performance e responsividade.

## Estrutura e Metodologia
A estrutura dos testes segue o padrão **Page Object Model (POM)**, que facilita a manutenção e reutilização do código, além de promover uma organização mais eficiente. O projeto está dividido em classes específicas para cada página, como **CartPage**, **HeaderPage**, **FooterPage**, **LoginPage** e **AccountPage**, permitindo a centralização de validações e interações de elementos comuns entre os testes.

## Funcionalidades Testadas

- **Login de Usuário**: Realização de login com dados válidos e inválidos, incluindo verificações de erros e sucessos.
- **Logout de Usuário**: Teste para garantir que o logout funcione corretamente, invalidando a sessão do usuário.
- **Carrinho de Compras**: Adição de produtos ao carrinho, validação das informações do carrinho, remoção de produtos e prosseguimento para o checkout.
- **Checkout**: Preenchimento de dados de pagamento e confirmação do pedido, com verificação de detalhes como número do pedido e status de sucesso.
- **Remoção de Conta**: Teste para garantir que a remoção da conta do usuário funcione corretamente.
- **Responsividade e Layout**: Validação do comportamento do layout em diferentes dispositivos, garantindo uma boa experiência do usuário em desktops, tablets e dispositivos móveis.
- **Performance**: Medição do tempo de carregamento das páginas para garantir que o tempo de resposta esteja dentro dos padrões de qualidade.
- **Validações de Elementos**: Verificação de elementos essenciais da página, como cabeçalho, rodapé, e links de navegação, para garantir que todas as informações e links estejam visíveis e funcionando corretamente.
- **Página de Contato**: Validação do formulário de contato e envio de mensagens, garantindo o funcionamento adequado.

## Tecnologias Utilizadas

- **Cypress**: Framework de automação de testes E2E.
- **JavaScript**: Linguagem utilizada para escrever os testes e interagir com o DOM.
- **Fixtures**: Utilização de dados dinâmicos durante os testes, como credenciais de login e informações de pagamento.
- **Page Object Model (POM)**: Estrutura modular e reutilizável para o código de testes.

## Resultados Esperados
O projeto visa proporcionar um processo de testes mais ágil e eficaz, garantindo que as funcionalidades críticas do site funcionem corretamente em diferentes cenários. Além disso, busca-se melhorar continuamente a qualidade do site, proporcionando uma experiência de usuário fluida e sem erros.

## Próximos Passos

- **Aumentar a cobertura de testes**: Incluir mais casos negativos e testes de segurança.
- **Testes de Acessibilidade e de Carga**: Implementar testes para garantir que a plataforma seja robusta em diferentes condições de uso.
- **Aprimorar os testes de performance**: Melhorar a análise de tempo de resposta para volumes maiores de dados.
