# Projeto de Lista de Alimentos

Este projeto é uma aplicação web que permite visualizar uma lista de alimentos e seus componentes nutricionais. A aplicação é construída usando React e Material-UI para a interface do usuário.

## Estrutura do Projeto

- **src/**: Contém todo o código-fonte do projeto.
  - **api/**: Contém a configuração do Axios e as funções de requisição para a API.
    - `axiosConfig.js`: Configuração do Axios para chamadas de API.
    - `requests.js`: Funções para buscar dados da API.
  - **components/**: Contém componentes reutilizáveis.
  - **pages/**: Contém as páginas principais da aplicação.
    - `FoodList.js`: Página que exibe a lista de alimentos.
    - `FoodComponents.js`: Página que exibe os componentes nutricionais de um alimento específico.
  - **App.js**: Componente principal que define as rotas da aplicação.
  - **index.js**: Ponto de entrada da aplicação.
  - **index.css**: Estilos globais da aplicação.
  - **App.css**: Estilos específicos para o componente App.

## Configuração do Projeto

### Pré-requisitos

- Node.js e npm instalados em sua máquina.

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd seu-repositorio
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

### Executando o Projeto

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm start
```

A aplicação estará disponível no navegador no endereço:

A aplicação estará disponível em `http://localhost:3000`.

## Uso

- **Lista de Alimentos**: A página inicial exibe uma lista de alimentos. Você pode filtrar os alimentos usando o campo de busca.
- **Componentes Nutricionais**: Clique em um alimento para ver seus componentes nutricionais.

## API

A aplicação se comunica com uma API REST para buscar dados. A configuração da API está localizada em `src/api/axiosConfig.js`.
# scrapper-client
