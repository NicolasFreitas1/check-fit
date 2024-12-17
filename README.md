# Check Fit - Documentação Geral

A aplicação **Check Fit** consiste em dois componentes principais: a API (Backend) e o Client (Frontend). Esta documentação oferece uma visão geral do funcionamento do sistema, os requisitos necessários, links para as documentações específicas de cada parte da aplicação e um guia para rodar ambos os componentes usando Docker.

## Ambiente de produção

O projeto está atualmente rodando em um servidor AWS disponível no endereço:
http://18.119.164.224:3000

## Requisitos

Antes de iniciar a aplicação, você precisa garantir que atenda aos seguintes pré-requisitos:

- **API Backend**: A API deve estar rodando para que o Frontend funcione corretamente. Você pode consultar a documentação da API [aqui](./api/README.md).
- **Node.js**: Certifique-se de ter o Node.js instalado. Caso não tenha, faça o download e instale a partir do [site oficial do Node.js](https://nodejs.org/).
- **Docker**: Para facilitar a execução dos componentes, também é possível rodar a aplicação usando Docker. Veja abaixo como configurá-lo.

## Rodando a Aplicação (Usando docker)

1.  Clone o repositório do **Check Fit**:

    ```bash
    git clone git@github.com:NicolasFreitas1/check-fit.git
    ```

2.  Insira as variáveis de ambientes de cada aplicação:

    - API - Crie um arquivo .env na raiz do Frontend e insira o seguinte conteúdo:

      ```.env

         DATABASE_URL="postgresql://docker:docker@check-fit-pg:5432/check-fit-db"

         JWT_PRIVATE_KEY=""
         JWT_PUBLIC_KEY=""

         PORT=
      ```

    - Front - Crie um arquivo .env na raiz do Frontend e insira o seguinte conteúdo:
      ```.env
      VITE_API_URL="http://localhost:3001"
      VITE_GOOGLE_MAPS_API_KEY=""
      ```

3.  Execute os containers docker:
    ```
     docker compose up -d --build
    ```

## Rodando separadamente

### 1. Backend (API)

Siga as instruções da documentação específica da API para rodá-la separadamente. Para mais detalhes, acesse a [documentação da API](./api/README.md).

### 2. Frontend (Client)

Siga as instruções da documentação específica do Frontend para rodá-lo separadamente. Para mais detalhes, acesse a [documentação da API](./client/README.md).

## Documentações

### Diagrama ER

![modelo-er](/docs/modelagens/check-fit-modelagem.png)

### Fluxograma

![fluxograma](/docs/fluxogramas/Fluxograma%20-%20CheckFit.png)

### Prototipação baixa fidelidade

O projeto possui uma prototipação de baixa fidelidade disponível no Figma:
[Figma - Check Fit](https://www.figma.com/design/IzNc4pMq8iilkZGd8cHYzE/CheckFit---Baixa-Fidelidade?node-id=0-1&t=d41SIHPW7qZDUZeN-1)
