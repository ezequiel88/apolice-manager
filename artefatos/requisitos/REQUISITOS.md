## 📄 Sistema Web para Gestão de Apólices

## Visão Geral

O objetivo deste projeto é digitalizar o processo manual de gerenciamento de apólices de seguros, criando uma interface web coesa e responsiva que permita aos operadores realizar operações CRUD (Create, Read, Update, Delete) sobre apólices. A aplicação será desenvolvida utilizando NextJS e TypeScript, com a API mockada utilizando json-server.

## Requisitos Funcionais

1. **Listar Apólices**:

   - A aplicação deve permitir a visualização de uma lista paginada de apólices.
   - Deve ser possível realizar buscas na lista de apólices com base em critérios de pesquisa.

2. **Criar Apólice**:

   - A aplicação deve permitir a criação de uma nova apólice.
   - Deve haver um formulário para entrada dos dados da apólice, incluindo informações sobre o segurado e coberturas.

3. **Visualizar Detalhes da Apólice**:

   - A aplicação deve permitir a visualização detalhada de uma apólice específica, exibindo todas as suas informações.

4. **Editar Apólice**:

   - A aplicação deve permitir a edição de uma apólice existente.
   - Deve haver um formulário pré-preenchido com os dados atuais da apólice para que possam ser atualizados.

5. **Excluir Apólice**:
   - A aplicação deve permitir a exclusão de uma apólice específica.

## Requisitos Não Funcionais

1. **Tecnologias**:

   - A aplicação será desenvolvida utilizando NextJS e TypeScript.
   - A API será mockada utilizando json-server.

2. **Responsividade**:

   - A interface deve ser responsiva e funcionar bem em diferentes dispositivos e tamanhos de tela.

3. **Qualidade do Código**:

   - O código deve ser limpo, modular e seguir as melhores práticas de desenvolvimento.

4. **Testes**:
   - A aplicação deverá incluir testes para garantir a funcionalidade correta das operações CRUD.

## Especificações da API

1. **GET /apolices**

   - **Parâmetros**:
     - `_page`: int (número da página)
     - `_per_page`: int (tamanho da página)
   - **Resposta**:
     `json
{
    "first": 1,
    "prev": null,
    "next": null,
    "last": 1,
    "pages": 1,
    "items": 2,
    "data": [
       {
          "id": "d7c5",
          "numero": 159963,
          "valor_premio": 179.9,
          "segurado": {
          "nome": "Ezequiel Tavares",
          "email": "reacaosistemas@gmail.com",
          "cpf_cnpj": "123.456.789-10"
          },
          "coberturas": [
          {
             "nome": "Granizo",
             "valor": 599
          },
          {
             "nome": "Teste",
             "valor": 159.9
          }
          ]
       }
    ]
 }
`

2. **POST /apolices**

   - **Corpo da Requisição**:
     ```json
     {
       "numero": 159963,
       "valor_premio": 179.9,
       "segurado": {
         "nome": "Ezequiel Tavares",
         "email": "reacaosistemas@gmail.com",
         "cpf_cnpj": "123.456.789-10"
       },
       "coberturas": [
         {
           "nome": "Granizo",
           "valor": 599
         },
         {
           "nome": "Teste",
           "valor": 159.9
         }
       ]
     }
     ```

3. **PUT /apolices/{id}**

   - **Corpo da Requisição**:
     ```json
     {
       "id": "d7c5",
       "numero": 159963,
       "valor_premio": 179.9,
       "segurado": {
         "nome": "Ezequiel Tavares",
         "email": "reacaosistemas@gmail.com",
         "cpf_cnpj": "123.456.789-10"
       },
       "coberturas": [
         {
           "nome": "Granizo",
           "valor": 599
         },
         {
           "nome": "Teste",
           "valor": 159.9
         }
       ]
     }
     ```

4. **GET /apolices/{id}**

   - **Resposta**:
     ```json
     {
       "id": "d7c5",
       "numero": 159963,
       "valor_premio": 179.9,
       "segurado": {
         "nome": "Ezequiel Tavares",
         "email": "reacaosistemas@gmail.com",
         "cpf_cnpj": "123.456.789-10"
       },
       "coberturas": [
         {
           "nome": "Granizo",
           "valor": 599
         },
         {
           "nome": "Teste",
           "valor": 159.9
         }
       ]
     }
     ```

5. **DELETE /apolices/{id}**
   - **Resposta**: 204 No Content

## Plano de Implementação

1. **Configuração do Ambiente**:

   - Configurar o projeto NextJS com TypeScript.
   - Configurar o json-server para mockar a API.

2. **Desenvolvimento da Interface**:

   - Criar os componentes de UI necessários (listagem, formulários, etc.).
   - Implementar a navegação entre as páginas.

3. **Implementação das Operações CRUD**:

   - Desenvolver as funcionalidades de listagem, criação, leitura, atualização e exclusão de apólices.
   - Integrar a API mockada com a interface.

4. **Testes**:

   - Escrever testes para as funcionalidades implementadas.
   - Garantir que todas as operações CRUD estejam funcionando corretamente.

5. **Documentação**:

   - Documentar o código e as funcionalidades da aplicação.
   - Escrever instruções para a execução do projeto.

6. **Hospedagem**:
   - Hospedar o código em uma plataforma de versionamento (GitHub, GitLab, etc.).
   - Fornecer instruções para a clonagem e execução do projeto.

## Testes

- **Testes Unitários**:
  - Testar componentes isoladamente para garantir que estão funcionando conforme esperado.
- **Testes de Integração**:

  - Testar a interação entre os componentes e a API mockada.

- **Testes de Interface de Usuário**:
  - Garantir que a interface seja responsiva e funcione bem em diferentes dispositivos e tamanhos de tela.

## Entrega e Hospedagem

- O código será hospedado em uma plataforma de versionamento (GitHub, GitLab, etc.).
- Incluir um arquivo README.md com instruções claras sobre como clonar e executar o projeto.
- O prazo para a entrega é de uma semana a partir do recebimento deste teste técnico.
