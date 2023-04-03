# Hello World with Neon and Kysely using Next.js 13

Create a [Next.js 13 project with app routing](https://beta.nextjs.org/docs)

Signup and create a [Neon Project](https://neon.tech/)

To generate sample table and data give the following command in the Neon SQL Editor:

    CREATE TABLE playing_with_neon(id SERIAL PRIMARY KEY, name TEXT NOT NULL, value REAL);

    INSERT INTO playing_with_neon(name, value)
    SELECT LEFT(md5(i::TEXT), 10), random() FROM generate_series(1, 10) s(i);

    SELECT * FROM playing_with_neon;

Copy the Neon connection string into the next.config.js file as env variable

Install the following packages:

    npm i kysely kysely-neon ws

Update code in src/app/api/hello/route.ts file.

Run the Next.js Server:

    npm run dev

Call the api in browser or Postman:

    http://localhost:3000/api/hello

References:

[Neon](https://neon.tech/)

[Kysely](https://kysely-org.github.io/kysely/)

[Kysely Dialect for Neon](https://github.com/seveibar/kysely-neon)


## Note: I am getting the following Error:

error - node_modules/@neondatabase/serverless/index.js (43:3300) @ ws

error - unhandledRejection: Error: All attempts to open a WebSocket to connect to the database failed. If using Node, please install the `ws` package (or simply use the `pg` package instead).
    at ws (webpack-internal:///(sc_server)/./node_modules/@neondatabase/serverless/index.js:3948:31)

null
