# Next.js Hello World with TypeScript

If you’ve never written React code, you should go through the [React recorded classes](https://github.com/panacloud/bootcamp-2020#part-i-front-end-fundamentals-with-react) first. Please cover classes 1-8.

If you donot know Typescript go through this [Essential TypeScript 4: From Beginner to Pro book](https://www.oreilly.com/library/view/essential-typescript-4/9781484270110/). You can also watch the classed 14, 15, and 16 from [here](https://github.com/panacloud/bootcamp-2020#part-ii-programming-with-typescript)

Read Chapter 1 of the [Real World Next.js](https://www.packtpub.com/product/real-world-next-js/9781801073493)

To Create Project give the following command:

npx create-next-app step00_helloworld_typescript --ts

Lets make the project simple by deleting the api directory, all styles and their imports in pages/_app.tsx, and deleting most of the code in pages/index.tsx include the style imports. Than add a simple hello world div.

To run give the following command:

npm run dev

Now open the project in the browser:

http://localhost:3000


Now Read Chapter 2 of the [Real World Next.js](https://www.packtpub.com/product/real-world-next-js/9781801073493)



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

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
