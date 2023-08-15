# Authentication with Next.js, JOSE, and JWT
This guide will walk you through the process of setting up login authentication using Next.js, the JOSE library for JWT verification, and JSON Web Tokens (JWT) to represent user sessions.

## What is JWT?
JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. In the context of authentication, once the user logs in, the server generates a JWT that encodes a set of claims, including the user's identity. Instead of sending it directly for the client to manage, the server sets this JWT in a cookie. This means that for subsequent requests, the client will automatically send this cookie, containing the JWT, back to the server. The server can then verify the JWT from the cookie to identify and authorize the user. This approach ensures a seamless and secure user experience, as the client doesn't have to manually handle the JWT for each request.

## Role of JOSE Library
The JOSE (JavaScript Object Signing and Encryption) library is used in this setup to both generate and verify JWTs. It provides a comprehensive set of tools for working with JWTs, ensuring they are correctly signed and valid for use.

## How It Works
The authentication flow in this setup involves three main files: login API, get user API, and middleware. Here's a step-by-step breakdown of how these files interact to provide a secure authentication mechanism:

### 1. Login API (`/api/auth/login`)
When a user wants to log in:

- A POST request is sent to the `/api/auth/login` endpoint, typically using tools like Postman, with a body containing the email and password.

- If the provided credentials match the hardcoded values (admin for both email and password), a JWT (JSON Web Token) is generated using the JOSE library.
- This JWT is then stored in a cookie named token with the httpOnly flag, ensuring it can't be accessed via JavaScript on the client side.
- A response with the message "Login success" is returned to the client.
- If the credentials do not match, a response with the message "Invalid Email or password" is returned.

### 2. Get User API (`/api/auth/get-user`)
This API is designed to fetch user details:

- It can only be accessed if the JWT is valid. The validity of the JWT is checked via the middleware.
- If the JWT is valid, the user's details (in this case, the email from the JWT) are returned in the response.

### 3. Middleware
The middleware acts as a gatekeeper for incoming requests:

- It first checks for the presence of the token cookie in the request. If the token is absent, the user is redirected to the `/login` page.

- If the token is present, the middleware uses the JOSE library to verify the JWT's validity against the secret key.

- If the JWT is valid, the payload (which contains the user's email) is extracted and added to the request headers. This allows the subsequent APIs (like the get user API) to access the user's details.

- The request is then forwarded to the appropriate location (API or page) with the added user details.

## Resources:

- https://codevoweb.com/jwt-authentication-in-nextjs-13-api-route-handlers/
- https://github.com/mehmetpekcan/nextjs-13-jwt-auth-example
