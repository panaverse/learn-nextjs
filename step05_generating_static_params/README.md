# Next.js 13 Generating Static Params

The generateStaticParams server function can be used in combination with dynamic route segments to define the list of route segment parameters that will be statically generated at build time instead of on-demand.

Read API Reference:

[generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

[dynamic params config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams)

Note 1: You can use the dynamicParams segment config option to control what happens when a dynamic segment is visited that was not generated with generateStaticParams.

Note 2: During next dev (i.e. running on local machine), generateStaticParams will be called when you navigate to a route.

Note 3: During next build, generateStaticParams runs before the corresponding Layouts or Pages are generated.

Note 4: During revalidation (ISR), generateStaticParams will not be called again.

This replaces getStaticPaths of Next.js 12 with a simplified API. generateStaticParams doesn't require any context parameters. It runs at build time before the corresponding Layouts or Pages are generated. It will not be called again during revalidation (ISR).

The primary benefit of the generateStaticParams function in it's smart retrieval of data. If content is fetched within the generateStaticParams function using a fetch request, the requests are automatically deduped. This means a fetch request with the same arguments across multiple generateStaticParams, Layouts, and Pages will only be made once, which decreases build times.

[Read the Generating Static Params](https://beta.nextjs.org/docs/data-fetching/generating-static-params)

[Read the dynamic segments docs](https://beta.nextjs.org/docs/routing/defining-routes#dynamic-segments)

See [generateStaticParams server function documentation](https://beta.nextjs.org/docs/api-reference/generate-static-params) for more information and advanced use cases.

Create app/[name] directory

Update app/[name]/page.tsx file

Update app/page.tsx file

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
