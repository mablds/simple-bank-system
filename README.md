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

### Routes

There are just few routes that were created to study about APIs and how to deal with NoSQL databases.

#### Home

Running the public API:
```https://simple-bank.herokuapp.com/```

Running locally:
```http://localhost:3000/```

- HTTP Method: GET
- Params: None
- Headers: None

#### Authentication

Running the public API:
```https://simple-bank.herokuapp.com/auth```

Running locally:
```http://localhost:3000/auth```

- HTTP Method: POST
- Params: None
- Headers: None
- Body: account and password

###### Body request example to test:
{
    account: 7839,
    password: "bla"
}

###### Expected responses:

- **HTTP Status Code: 200**
{
    "id": "5e2dec5179c2af11d4b4e61f",
    "owner": "Marcelo",
    "value": "R$ 20000",
    "token": "SomeJWTsecureToken"
}

- **HTTP Status Code: 403**
{
    msg: 'senha incorreta'
}

- **HTTP Status Code: 204**
{
    msg: 'Body vazio'
}

#### Bank Operations