# Object-Relational Mapping using Prisma

[Databases in Next.js](https://vercel.com/docs/concepts/solutions/databases)

Prisma is a Next-generation ORM for Node.js & TypeScript. You can connect to PostgreSQL, MySQL, MariaDB, SQL Server, SQLite, MongoDB and CockroachDB.

[What Is Prisma?](https://www.prisma.io/docs/concepts/overview/what-is-prisma)

[Why Prisma?](https://www.prisma.io/docs/concepts/overview/why-prisma)

[We will follow this tutorial](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres)

Create step40_prisma_quick_start directory

cd step40_prisma_quick_start

npm init -y

npm install prisma typescript ts-node @types/node --save-dev

Create tsconfig.json

npx prisma init

[Read the Docs: 5 ways to host database](https://www.prisma.io/dataguide/postgresql/5-ways-to-host-postgresql)

First create a app on [Heroku](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1) and then create two Free PostgreSQL Databases

The first database is to store the data, the second instance is a shadow database only used in development.

Read the details about [shadow database](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database)

Edit and Update the prisma/schema.prisma file and create the models. [Learn more about Prisma schemas in the docs](https://pris.ly/d/prisma-schema)

npx prisma migrate dev --name init

npm install @prisma/client

Note: Whenever you make changes to your Prisma schema in the future, you manually need to invoke prisma generate in order to accommodate the changes in your Prisma Client API.

Create index.ts file

npx ts-node index.ts

View the database tables by executing the command:

npx prisma studio

[Now Explore](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/next-steps-typescript-postgres)



