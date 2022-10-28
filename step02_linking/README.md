# Next.js 13 Linking and Navigating

[Read the Linking and Navigating fundamentals docs](https://beta.nextjs.org/docs/routing/linking-and-navigating)

We will use the [Link](https://beta.nextjs.org/docs/api-reference/components/link) component to navigate between home page and name page.

We will use [useRouter() Hook](https://beta.nextjs.org/docs/api-reference/use-router) to programmatically change routes inside Name [Client Component](https://beta.nextjs.org/docs/rendering/server-and-client-components#client-components).

We should use the <Link> component for navigation unless you have a specific requirement for using useRouter.


Start the Server:

        npm run dev

Open the Browser:

        http://localhost:3000/





This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

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
