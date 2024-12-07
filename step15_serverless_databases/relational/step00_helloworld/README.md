# Hello World Vercel Postgres

Signup to [Vercel](https://vercel.com/)

Install the Vercel CLI:

    npm i -g vercel@latest

Create a new Project:

    npx create-next-app@latest

Deploy the project to Vercel:

    vercel

Now open [Dashboard](https://vercel.com/dashboard) in Browser

Open the Project Page you just created

Select the Storage Tab on the Project Page and Create a Vercel Postgres Database

Pull the env variables:

    vercel env pull .env.development.local

Install the library:

    npm i @vercel/postgres

Create route.ts file in app/api/pets directory

    npm run dev

Open the browser with this URL or make a GET request using Postman:

    http://localhost:3000/api/pets








