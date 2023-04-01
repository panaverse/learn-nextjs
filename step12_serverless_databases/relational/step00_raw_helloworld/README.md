# Hello World with Neon and Next.js 13

Signup and create a [Neon Project](https://neon.tech/)

To generate sample table and data give the following command in the Neon SQL Editor:

    CREATE TABLE playing_with_neon(id SERIAL PRIMARY KEY, name TEXT NOT NULL, value REAL);

    INSERT INTO playing_with_neon(name, value)
    SELECT LEFT(md5(i::TEXT), 10), random() FROM generate_series(1, 10) s(i);

    SELECT * FROM playing_with_neon;

Copy the Neon credentials into the next.config.js file

    npm i postgres

Update code in src/app/api/hello/route.ts file.