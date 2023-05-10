# Drizzle-ORM and @vercel/postgres

## Quick start

First, create an NEXT Project using this command

```bash
npx create-next-app@latest

```

### step 2:

Create an postgres database in vercel dashboard

Open [https://vercel.com/dashboard] vercel dashboard

then goto storage Tab

Open [https://vercel.com/dashboard/stores] vercel Storage

### step 3

Click on Create Database and select vercel postgres from modal , then select project from listing if project is not available then open project in VS code and link that project to vercel for link use this command

```bash
vercel link

```

run this command in your project terminal for connection environment

```bash
vercel env pull .env.development.local
```

then also install this package

```bash
npm install @vercel/postgres
```

### step 4

Click on Storage Tab and select database
-1 click on Query Tab and create SQL Table using run this query

```sql
create Table todo(
id serial primary key,
title varchar(255),
description varchar(255),
status boolean default true not null,
)
```

### step 5

Open [https://github.com/drizzle-team/drizzle-orm](Drizzle-orm documentation)

Follow this [https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/pg-core/README.md](documentation) for Vercel Postgres

  Note: This code is Written By [Jahanzaib](https://github.com/JahanzaibTayyab)
