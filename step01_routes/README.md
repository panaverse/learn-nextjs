# Next.js 13 Routes

[Read the routing fundamentals docs](https://beta.nextjs.org/docs/routing/fundamentals)

In Next.js 13 folders are used to define routes. A route is a single path of nested folders, following the hierarchy from the root folder down to a final leaf folder.

Files are used to create UI that is shown for the route segment.

To create a route you can create a folder in the app directory. For example, you can add app/name director with its page.tsx file.

To create a nested route, you can nest folders inside each other. For example, you can add a new app/name/address route by nesting two new folders in the app directory.

The /name/address route is composed of three segments:

/ (Root segment)

name (Segment)

address (Leaf segment)


Now lets test this, take the code in step00 and create a directory app/name and a page.tsx file in it. 

Edit app/name/page.tsx and make a very simple React component in the file. Note that it is a convention in Next.js that the page in the director is called page.tsx

Also create a directory app/name/address and a page.tsx file in it. 

Start the Server:

        npm run dev

Open the Browser:

        http://localhost:3000/name

        http://localhost:3000/name/address

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
