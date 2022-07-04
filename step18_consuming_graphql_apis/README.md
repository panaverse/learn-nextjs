# Consuming GraphQL APIs on Server Side i.e. server-side rendering (SSR)

Read pages 99-111 of Chapter 4 of the [Real World Next.js](https://www.packtpub.com/product/real-world-next-js/9781801073493)

To Create Project give the following command:

Create the pages/index.tsx and pages/new-sign.tsx file

npm run dev

Now open the project in the browser:

http://localhost:3000



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Step 1
Add required dependencies in your project. 
```bash
yarn add @apollo/client graphql isomorphic-unfetch
```



## Setup the Graphql Client
Make a folder lib/apollo and create an index.ts file and add relavent code to setup the graphql clinet.
You can use your prefered Graphql API if you wish.

## Write Graphql Queries
Inside the lib/apollo folder, make a new folder "queries" and add your queries in multiple files with the .ts extention

## Fetch all the data on server side
First, initiate the graphQL clinet at top level. 
then use getServerSideProps function and call your main API to fetch all the data and return data in your dersired format from this function and receive it on the Home Functions. Then, use Link tage to route the user to sub pages and inside sub page, again use getServerSideProps function to get detail of the page. 

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
