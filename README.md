# Bank System Simulator

Practicing MongoDB + Nodejs API using a simple bank systems. 


## Installation

If you want to test it locally, you can follow the following steps to install and run it successfully.

#### Requirements:

- Git installed
- Node.js installed

#### Steps

First, clone the repository:
```git clone https://github.com/mablds/simple-bank-system.git ```

Then install it using the dependecy manager of your preference like NPM:
```npm install```

## Usage

This API is public and hosted by Heroku for education purposes. So if you are interest to test it without clone and run locally, feel free to play around consulting this Documentation.

## Routes

There are just few routes that were created to study about APIs and how to deal with NoSQL databases.

### Home
```
- URL: '/'
- HTTP Method: GET
- Params: None
- Headers: None
```
___

### Authentication
```
- URL: '/auth'
- HTTP Method: POST
- Params: None
- Headers: None
- Body: account and password
```
###### Body request example to test:
```
{
    account: 7839,
    password: "bla"
}
```
###### Expected responses:
```
- **HTTP Status Code: 200**
{
    "id": "5e2dec5179c2af11d4b4e61f",
    "owner": "Marcelo",
    "value": "R$ 20000",
    "token": "SomeJWTsecureToken"
}
```
___
```
- **HTTP Status Code: 403**
{
    msg: 'senha incorreta'
}
```
___
- **HTTP Status Code: 204**
{
    msg: 'Body vazio'
}
```
___

#### Bank Queries

##### Para rodar o projeto:
```
git clone
npm install
npm run syncTables
npm start
```

Além dos passos informados, é necessário um arquivo .env com os seguintes dados:
```
POSTGRESQL_URI=postgresql://ip:port:login
AUTH_HASH=a_really_good_password
PORT=3000
```

## Login
Para efetuar login na API, basta fazer um request com o método POST na rota "/auth" contendo no body as informações de e-mail e senha. Confira o exemplo do body a seguir:

###### Requisição necessária: 

```
Rota: /auth,
Método: POST,
Header: ,
Body: {
    "email": "teste@teste",
    "password": "teste"
}
```

###### Resposta esperada: 

```
Status Code: 200
Body: {
    user: Informações do usuário logado,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImFkbWluIjp0cnVlLCJpYXQiOjE1NjI2MDYwNTEsImV4cCI6MTU2MjYxMzI1MX0.PS2YMK99XRuMSzKHlr15rJqaowq6Rh3udC9B8GqdVLM"
}
```

## Nivel de Usuario
Os usuários são setados como padrão no banco com o campo "admin" = false. Para realizar qualquer alteração no banco e para realizar qualquer operação com os dados dos usuários, é necessário estar autenticado com um token de "admin" = true. O nível de operador ("admin" = false) só é capaz de visualizar as Contas a Pagar, Contas a Receber e Relatório completo.

## Querys - Usuários
As querys na database são realizadas ao realizar requisições em determinadas rotas com determinados métodos. Confira o exemplo a seguir:

#### Requisição necessária:
| Métodos    |Rotas|Admin|Ação|Resposta Esperada|Status Code|
|:----------:|:-----:|:----:|:---:|:-----:|:----:|
|GET         |/users|✔️|Lista todos os usuários|Vetor de Usuários|200|
|GET         |/users/:id|✔️|Lista as informações de um usuário específico| Objeto de Usuário|200|
|POST|        /users|✔️|Cadastra um usuário cuja as informações foram passadas no Body da requisição| Usuário Criado| 201|
|UPDATE|/users/:id|✔️|Edita as informações de um usuário específico| Informações atualizadas |202|
|DELETE      |/users/:id|✔️|Apaga um usuário específico| Usuário deletado |202|

___
#### Informações necessárias para a Listar o(s) usuário(s):
```
Rota: /users (/:id)
Método: GET,
Header: x-access-token: token,
Body: 
```

___
#### Informações necessárias para a Criação do usuário:
```
Rota: /users
Método: POST,
Header: x-access-token: token,
Body: {
    "name": "teste",
    "username": "teste",
    "email": "teste@teste",
    "password": "teste",
    "admin": true
}
```

___
#### Informações necessárias para Alterar o usuário:
```
Rota: /users/:id
Método: PUT,
Header: x-access-token: token,
Body: { Confira os exemplos abaixo }
```
###### Exemplos de Body para a alteração:
```
Body: {
    "name": "Marcelo",
    "email": "xpto@teste.com.br" //Único
    "username": "bla"
}
```

```
Body: {
    "admin": true
}
```
___

## Querys - Contas

#### Requisição necessária:
| Métodos    |Rotas|Admin|Ação|Resposta Esperada|Status Code|
|:----------:|:-----:|:----:|:---:|:-----:|:----:|
|GET         |/inc - /out||Lista todas as Contas a Pagar ou Contas Recebidas|Vetor de Contas a Pagar ou Contas Recebidas|200|
|GET         |/inc/:id - /out/:id||Lista as informações de Contas a Pagar ou Contas Recebidas específicas| Objeto de Conta a Pagar ou Conta Recebidas|200|
|POST|        /inc - /out|✔️|Cadastra uma Conta a Pagar ou Conta Recebidas cuja as informações foram passadas no Body da requisição| Conta a Pagar ou Conta Recebida criada com sucesso| 201|
|UPDATE|/inc/:id - /out/:id|✔️|Edita as informações de uma Conta a Pagar ou Conta Recebida específica| Informações atualizadas |202|
|DELETE      |/inc/:id - /out/:id|✔️|Apaga uma Conta específica| Conta deletado |202|
|PATCH|/inc/:id - /out/:id|✔️|Método que altera o status de false para true (Considera como paga) e determina a data para a informação contida no campo paymentDate do BD| Conta paga - Conta recebida | 202|

___
#### Informações necessárias para a Listar a(s) contas(s):
```
Rota: /inc || /out (/:id)
Método: GET,
Header: x-access-token: token,
Body: ,
```

___
#### Informações necessárias para a Criação de Contas:
```
Rota: /inc || /out
Método: POST,
Header: x-access-token: token,
Body: {
    "title": "comida",
    "description": "...",
    "value": 30000,
    "status": false,
    "paymentDate": null
}
```

___
#### Informações necessárias para Alterar as Contas:
```
Rota: /inc/:id || /out/:id
Método: PUT,
Header: x-access-token: token,
Body: { Confira os exemplos abaixo }
```
###### Exemplos de Body para a alteração:
```
Body: {
    "value": "5000",
}
```

```
Body: {
    "description": "conta do mês que vem do cartão de crédito",
    "title": "cartão",
}
```
___
#### Informações necessárias para a Listar a(s) contas(s):
```
Rota: /inc/:id || /out/:id
Método: PATCH,
Header: x-access-token: token,
Body: ,
```
___

## Relatório:

```
Rota: /report
Método: GET,
Header: x-access-token: token, opcionais: init-date & end-date,
Formato dos opcionais: "YYYY-MM-DD"
Body: ,
```

___
##### Informações necessárias para receber um Relatório completo:
```
Rota: /report
Método: GET,
Header: x-access-token: token,
Body: {}
```
##### Informações necessárias para receber um Relatório entre duas datas:
```
Rota: /report
Método: GET,
Header: x-access-token: token,
        init-date: 2019-07-05,
        end-date: 2019-07-18,
Body: {}
```
