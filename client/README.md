# Check Fit Client

Check Fit Client é a aplicação frontend construída com **React**, **Vite**, e **TailwindCSS**, para interagir com os dados da aplicação **Check Fit**. Ela fornece uma interface de usuário dinâmica, integrando-se aos endpoints RESTful da API para realizar operações como autenticação, gerenciamento de contas e academias, entre outros.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface de usuário.
- **Vite**: Build tool e servidor de desenvolvimento rápido para aplicações frontend.
- **TailwindCSS**: Framework CSS para criação de interfaces de usuário responsivas e personalizáveis.
- **Axios**: Cliente HTTP para comunicação com a API backend.
- **React Hook Form**: Biblioteca para gerenciamento de formulários no React.
- **Zod**: Validação de dados para segurança e robustez na entrada de dados.
- **React Router DOM**: Gerenciamento de rotas dentro da aplicação.
- **ShadcnUI**: Biblioteca de componentes acessíveis para React.

## Instalação

### Pré-requisitos

- Certifique-se de ter o **Node.js** instalado. Se não tiver, instale-o a partir do [site oficial](https://nodejs.org/).

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e defina as variáveis necessárias para a configuração do ambiente de desenvolvimento. Exemplo:

```.env
VITE_API_URL="http://localhost:3001"

VITE_GOOGLE_MAPS_API_KEY="chave-da-api"
```

### Rodando localmente

1. Clone o repositório e navegue até o diretório do projeto.

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. A aplicação estará disponível em `http://localhost:8080`.

## Funcionalidades

### 1. Autenticação

A aplicação permite que os usuários façam login com seu email e senha, gerando um **JWT** para autenticação em chamadas subsequentes à API.

#### Fluxo de Autenticação

1. O usuário envia seu email e senha.
2. O backend responde com um **JWT** que é armazenado no cliente.
3. A partir daí, o token é utilizado para autenticar as requisições subsequentes.

### 2. Gerenciamento de Contas

O usuário pode:

- **Criar uma conta**: Enviar um nome, email e senha.
- **Editar a conta**: Atualizar informações como nome e email.
- **Deletar a conta**: Excluir a conta do sistema.

### 3. Gerenciamento de Academias

Usuários administradores podem:

- **Criar, editar e deletar academias**: Gerenciar informações sobre academias, como nome, descrição, telefone, localização (latitude e longitude).
- **Listar academias**: Exibir academias em uma tabela paginada.
- **Realizar check-in**: Usuários podem fazer check-in em academias para marcar sua presença.

### 4. Gerenciamento de Check-ins

Os usuários podem:

- **Listar seus check-ins**: Visualizar todas as academias nas quais realizaram check-in.
- **Deletar check-ins**: Remover um check-in realizado em uma academia.

