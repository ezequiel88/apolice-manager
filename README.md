# 🚀 Apólice Manager

Bem-vindo ao **Apólice Manager**!

Este projeto visa digitalizar o processo de gerenciamento de apólices de seguro, proporcionando uma interface web responsiva, agradável e fácil de usar. 🖥️✨

### 📋 Tecnologias Utilizadas

- **Ambiente:** [NodeJs](https://nodejs.org/pt) - Foi utilizado no projeto versão v18.18.2
- **Framework:** [NextJS](https://nextjs.org/) + [TailwindCSS](https://tailwindcss.com/)
- **Linguagem:** TypeScript
- **Mock API:** [Json Server](https://www.npmjs.com/package/json-server)
- **Recursos:** Implementação completa de operações CRUD
- **Testes:** Cobertura de testes dos métodos CRUD 100% usando [Jest](https://jestjs.io/pt-BR/docs/getting-started) e um teste de componente

### 🛠️ Configuração do Projeto

#### Passo 1: Clone o repositório

```bash
git clone https://github.com/ezequiel88/apolice-manager.git
cd apolice-manager
```

#### Passo 2: Instale as dependências

```bash
npm install
```

#### Passo 3: Inicie o servidor da API Mockada

```bash
npm run server
```

#### Passo 4: Inicie o servidor de desenvolvimento (use outro terminal)

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### 🗃️ Arquivos do Projeto

```
__tests__
|-- component
|   |-- ApoliceItemList.test.tsx
|-- services
|   |-- apoliceService.test.ts
docs
|-- design
|   |-- ... arquivos de prototipagem e layout da aplicação
|-- requisitos.md
|-- swagger.yaml
db.json

... demais arquivos padrões do NextJS
```

### 📚 Backend - API Mockada

A API é mockada utilizando Json-Server.

🙋‍♂️ O arquivo `db.json` na raiz do projeto funciona como "base de dados" para o json-server manipular os dados.

Aqui estão os endpoints disponíveis (na seção de Documentação da API tem mais detalhes):

- #### GET /apolices

  Retorna a lista paginada de apólices.

- #### POST /apolices

  Cria uma nova apólice.

- #### GET /apolices/{id}

  Retorna os detalhes de uma apólice específica.

- #### PUT /apolices/{id}

  Atualiza uma apólice existente.

- #### DELETE /apolices/{id}

  Exclui uma apólice.


### 📑 Documentação da API

Na pasta `docs` contém o arquivo `swagger.yaml` no formato OpenAPI para a importação no [Swagger](https://editor-next.swagger.io/)

```
docs
|-- swagger.yaml
```

### 🧪 Testes

Para rodar os testes, use o comando na raiz do projeto:

```bash
npm test
```

### 🚀 Deploy

Para fazer o deploy do projeto e iniciar o servidor da aplicação, rode o comando abaixo na raiz da aplicação:

```bash
npm run build && npm run serve
```

### 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

### 📧 Contato

E-mail: [reacaosistemas@gmail.com](mailto:reacaosistemas@gmail.com)

Github: [Ezequiel Tavares](https://github.com/ezequiel88)

LinkedIn: [Ezequiel Tavares](https://linkedin.com/in/ezequielTav)
