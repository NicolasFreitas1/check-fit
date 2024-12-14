# Check Fit API

Check Fit API é uma aplicação backend construída com NestJS para gerenciar os dados da aplicação Check Fit. Ela fornece endpoints RESTful para realizar operações CRUD e outras funcionalidades necessárias.

## Tecnologias Utilizadas

- **NestJS**: Framework para construir aplicações Node.js escaláveis e testáveis.
- **Prisma**: ORM para interação com o banco de dados.
- **JWT**: Implementação de autenticação via JSON Web Token.
- **Zod**: Validação de dados.
- **Vitest**: Framework de testes.

## Instalação

### Pré-requisitos

- Certifique-se de ter o Node.js instalado. Se não tiver, instale-o a partir do [site oficial](https://nodejs.org/).
- Instale o gerenciador de pacotes **pnpm**:
  ```bash
  npm install -g pnpm
  ```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e defina as variáveis necessárias para a configuração do ambiente de desenvolvimento. Exemplo:

```.env
# Prisma (Database)
DATABASE_URL=""

# Auth (JWT) (Algoritimo utilizado: RS256)
JWT_PRIVATE_KEY=""
JWT_PUBLIC_KEY=""

# API Port
PORT=""
```

### Rodando localmente

1. Certifique-se de ter preenchido o arquivo `.env`:

2. Instale as dependências da aplicação:

   ```bash
   pnpm install
   ```

3. Crie o banco de dados rodando o seguinte comando:

   ```bash
   pnpx prisma migrate deploy
   ```

4. Gere a tipagem necessária para a node_modules:

   ```bash
   pnpx prisma generate
   ```

5. Execute a seed do banco de dados:

   ```bash
   pnpx prisma db seed
   ```

6. Certifique que no arquivo `package.json` a variável `type` está desse formato:

   ```json
   "type": "commonjs",
   ```

7. Inicie a API:

   ```bash
   pnpm start:dev
   ```

### Executando os testes

1. Certifique-se de ter preenchido o arquivo `.env`:

2. Instale as dependências da aplicação:

   ```bash
   pnpm install
   ```

3. Altere o `type` no `package.json` para **module**:

   ```json
   "type": "module",
   ```

4. Para rodar os testes unitários:

   ```bash
   pnpm test
   ```

5. Para rodar os testes End to End:

   ```bash
   pnpm test:e2e
   ```

## Arquitetura

Este projeto segue a Clean Architecture juntamente com os princípios do Domain-Driven Design (DDD), com o objetivo de manter a aplicação escalável, testável e fácil de entender. A arquitetura é dividida em camadas, com as responsabilidades separadas conforme os seguintes princípios:

- **Domain Layer (Domínio)**: Contém as entidades e lógica de negócios, incluindo as regras essenciais do sistema.
- **Application Layer (Aplicação)**: Define os casos de uso da aplicação e orquestra as interações entre o domínio e as camadas externas.
- **Infrastructure Layer (Infraestrutura)**: Responsável por toda a implementação técnica, como bancos de dados, APIs externas e outros serviços.

## Endpoints da API

### 1. Autenticar

- **URL**: `/sessions`
- **Método**: `POST`
- **Descrição**: Realiza a autenticação do usuário.

#### Corpo da Requisição (Body):

```json
{
  "email": "example@example.com",
  "password": "examplepassword123"
}
```

#### Respostas:

- **201**: Usuário autenticado com sucesso.

```json
{
  "access_token": "tokenjwt",
  "user": {
    "id": "uuid",
    "name": "Example Name",
    "email": "example@example.com"
  }
}
```

- **422**: Credenciais invalidas.

### 2. Criar Conta

- **URL**: `/accounts`
- **Método**: `POST`
- **Descrição**: Cria uma nova conta.

#### Corpo da Requisição (Body):

```json
{
  "name": "Example Name",
  "email": "example@example.com",
  "password": "examplepassword123"
}
```

#### Respostas:

- **201**: Conta criada com sucesso.

- **409**: Email já esta em uso.

### 3. Deletar Conta

- **URL**: `/accounts`
- **Método**: `DELETE`
- **Descrição**: Deleta a conta do usuário atual.

#### Respostas:

- **204**: Conta deletada com sucesso.

- **404**: Conta não encontrada.

### 4. Editar Conta

- **URL**: `/accounts/:userId`
- **Método**: `PUT`
- **Descrição**: Edita informações da conta do usuário.

#### Corpo da Requisição (Body):

```json
{
  "name": "Example Name",
  "email": "example@example.com"
}
```

#### Respostas:

- **204**: Conta editada com sucesso.

- **404**: Conta não encontrada.

- **409**: Email já esta em uso.

### 5. Editar Senha

- **URL**: `/accounts/:userId/password`
- **Método**: `PATCH`
- **Descrição**: Edita a senha da conta do usuário.

#### Corpo da Requisição (Body):

```json
{
  "oldPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

#### Respostas:

- **204**: Senha editada com sucesso.

- **404**: Conta não encontrada.

- **422**: Credenciais invalidas.

### 6. Obter perfil

- **URL**: `/accounts/me`
- **Método**: `GET`
- **Descrição**: Obtém o perfil do usuário atual.

#### Respostas:

- **200**: Conta retornada com sucesso.

```json
{
  "user": {
    "id": "uuid",
    "name": "Example Name",
    "email": "example@example.com"
  }
}
```

- **404**: Conta não encontrada.

### 7. Criar academia

- **URL**: `/gyms`
- **Método**: `POST`
- **Descrição**: Cria uma nova academia (somente para usuários administradores).

#### Corpo da Requisição (Body):

```json
{
  "name": "Example Name",
  "description": "Example description",
  "phone": "+5511998765432",
  "latitude": -15.09,
  "longitude": 15.09
}
```

#### Respostas:

- **201**: Academia criada com sucesso.

### 8. Editar academia

- **URL**: `/gyms/:gymId`
- **Método**: `PUT`
- **Descrição**: Edita uma academia (somente para usuários administradores).

#### Corpo da Requisição (Body):

```json
{
  "name": "Example Name",
  "description": "Example description",
  "phone": "+5511998765432",
  "latitude": -15.09,
  "longitude": 15.09
}
```

#### Respostas:

- **204**: Academia editada com sucesso.
- **404**: Academia não encontrada.

### 9. Deletar academia

- **URL**: `/gyms/:gymId`
- **Método**: `DELETE`
- **Descrição**: Deleta uma academia (somente para usuários administradores).

#### Respostas:

- **204**: Academia editada com sucesso.
- **404**: Academia não encontrada.

### 10. Listar academias

- **URL**: `/gyms`
- **Método**: `GET`
- **Descrição**: Lista as academias paginadas.

#### Respostas:

- **200**: Listagem retornada com sucesso.

```json
{
  "gyms": [
    {
      "id": "uuid",
      "name": "Example Name",
      "description": "Example description",
      "phone": "+5511998765432",
      "latitude": -15.09,
      "longitude": 15.09,
      "createdAt": "2024-12-14T19:12:34.567Z"
    }
  ],
  "amount": 1,
  "totalPages": 1,
  "actualPage": 1,
  "perPage": 20
}
```

### 11. Retornar academia especifica

- **URL**: `/gyms/:gymId`
- **Método**: `GET`
- **Descrição**: Retorna uma academia de acordo com o id especificado.

#### Respostas:

- **200**: Academia retornada com sucesso.

```json
{
  "gyms": {
    "id": "uuid",
    "name": "Example Name",
    "description": "Example description",
    "phone": "+5511998765432",
    "latitude": -15.09,
    "longitude": 15.09,
    "createdAt": "2024-12-14T19:12:34.567Z"
  }
}
```

- **404**: Academia não encontrada.

### 12. Realizar check-in em uma academia

- **URL**: `/gyms/:gymId/check-ins`
- **Método**: `POST`
- **Descrição**: Realiza check-in em uma academia.

#### Respostas:

- **201**: Check-in realizado com sucesso.
- **404**: Academia não encontrada.
- **409**: Usuário ja realizou check-in no dia atual.

### 13. Listar check-ins do usuário

- **URL**: `/accounts/check-ins`
- **Método**: `GET`
- **Descrição**: Retorna os check-ins do usuário atual.

#### Respostas:

- **200**: Listagem retornada com sucesso.

```json
{
  "checkIns": [
    {
      "id": "uuid",
      "gymId": "uuid",
      "userId": "uuid",
      "gym": {
        "id": "uuid",
        "name": "Example Name",
        "description": "Example description",
        "phone": "+5511998765432",
        "latitude": -15.09,
        "longitude": 15.09,
        "createdAt": "2024-12-14T19:12:34.567Z"
      }
    }
  ],
  "amount": 1,
  "totalPages": 1,
  "actualPage": 1,
  "perPage": 20
}
```

### 14. Exibir um check-in

- **URL**: `/check-ins/:checkInId`
- **Método**: `GET`
- **Descrição**: Exibe os check-ins do usuário atual.

#### Respostas:

- **200**: Check-in retornado com sucesso.

```json
{
  "checkIn": {
    "id": "uuid",
    "gymId": "uuid",
    "userId": "uuid",
    "gym": {
      "id": "uuid",
      "name": "Example Name",
      "description": "Example description",
      "phone": "+5511998765432",
      "latitude": -15.09,
      "longitude": 15.09,
      "createdAt": "2024-12-14T19:12:34.567Z"
    }
  }
}
```

- **405**: Check-in não encontrado.

### 15. Deletar check-in

- **URL**: `/check-ins/:checkInId`
- **Método**: `DELETE`
- **Descrição**: Deleta um check-in.

#### Respostas:

- **204**: Check-in deletado com sucesso.

- **404**: Check-in não encontrado.
