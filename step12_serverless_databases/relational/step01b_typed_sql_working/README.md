# Hello World with Neon and Kysely (PostgresDialect) using Next.js 13

Create a [Next.js 13 project with app routing](https://beta.nextjs.org/docs)

Signup and create a [Neon Project](https://neon.tech/)

To generate sample table and data give the following command in the Neon SQL Editor:

    CREATE TABLE playing_with_neon(id SERIAL PRIMARY KEY, name TEXT NOT NULL, value REAL);

    INSERT INTO playing_with_neon(name, value)
    SELECT LEFT(md5(i::TEXT), 10), random() FROM generate_series(1, 10) s(i);

    SELECT * FROM playing_with_neon;

Copy the Neon connection string into the next.config.js file as env variable

Install the following packages:

    npm i kysely kysely-neon pg 

    npm i @types/pg -D

You will also have to install pg-native module:

https://www.npmjs.com/package/pg-native

You need PostgreSQL client libraries & tools installed before you install pg-native npm package. An easy way to check is to type pg_config. If pg_config is in your path, you should be good to go. If it's not in your path you'll need to consult operating specific instructions on how to go about getting it there.

Once pg_config is in your path run:

    npm i pg-native

Update code in src/app/api/hello/route.ts file.

Run the Next.js Server:

    npm run dev

Call the api in browser or Postman:

    http://localhost:3000/api/hello

References:

[Neon](https://neon.tech/)

[Kysely](https://kysely-org.github.io/kysely/)


### Note: I have not been able to figure out how to deploy this project on Vercel. PostgreSQL client libraries & tools installed need to be installed for this project to run, and how do we do so in a Serverless Function.



