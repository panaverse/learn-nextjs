## Overview

This step demonstrates how to create a complete signup/login flow using your wallet which in this case is created using ZERODEV. We are using NEON (SQL database) to save the user's public address and other information. All the authentication apis were created using Nextjs.

## prerequisites

1) [Setup your NEON database](https://github.com/panaverse/learn-nextjs/tree/main/step12_serverless_databases/relational/step00_raw_helloworld)
2) Create a 'Users' table in your neon database 

```
CREATE TABLE "Users" (
  "entity_id" INT,
  "firstName" VARCHAR(50),
  "lastName" VARCHAR(50),
  "email" VARCHAR(50),
  "secretText" VARCHAR(50),
  "pictureUrl" VARCHAR(50),
  "creationDate" TIMESTAMP NOT NULL DEFAULT now(),
  "emailVerified" bit,
  "nonce" VARCHAR(50),
  "publicAddress" VARCHAR(50),
  PRIMARY KEY ("entity_id")   
);
```

We have added alot of extra fields in this table like firstname, lastname email etc for future use, but we will only be storing public address of the user in this step.

### Required libraries 

```
yarn add @zerodevapp
yarn add @zerodevapp/social-wallet
yarn add jsonwebtoken
yarn add uuid
yarn add postgres
```


### Understanding the flow

### Signup 

Apis used in this flow : get-user-nonce & signup

1) Whenever a user creates and connects their wallet on our application, we send that wallet address to our api called 'get-user-nonce'. This api returns the nonce if the user is already in our database. 

2) If no nonce is returned in step 1, this means that the user is signing in for the first time so we create an entry in the database using the 'signup' api. We save their publicAddress and a random nonce.


### login

Apis used in this flow : get-user-nonce &  login

1) We first retrieve user's nonce using the 'get-user-nonce' api.
2) We then ask the user to sign this nonce and this signature is sent to the 'login' api. If the signature is verified, this 'login' api creates a jwt token and saves it in cookies.

### middleware

[Learn middle](https://github.com/panaverse/learn-nextjs/tree/main/step13_middleware)

Apis used in this flow: authorize

1) Every request that needs to be accessed by only logged in users is checked by the middleware.
2) Middleware on every matching request, reads the saved jwt token in cookies and verifies it using the 'authorize' api. If the jwt is successfully verified then it allows the request to proceed otherwise throws an error (or redirects to another page).

Note: You cannot access database directly in the middleware due to websocket restrictions therefore we had to create 'authorize' api to access the database for jwt verification.


### Logout

Apis used in this flow: logout

1) This api clears the jwt token from cookies





