# Next.js With TypeScript and Contentful

[Exploring Headless CMS](https://blog.tarkalabs.com/exploring-headless-cms-f94466b765a2)

We are going to follow this tutorial: [A Static Website Dream Team: Next.js With TypeScript, Contentful, and Netlify](https://www.scale.at/blog/static-website-nextjs-typescript-contentful)

npx create-next-app step39_cms_contentful --ts

Update pages/index.tsx as per the instructions in the article.

Signup for Contentful:

https://www.contentful.com/sign-up/

npm i -D contentful contentful-management contentful-typescript-codegen dotenv

Create a .env file in the root of your project and add the following values:

- Space ID: you find the space ID in “Settings > General”

- Access token: go to “Settings > API keys” and add a new API key; get the Content Delivery API - access token

- Management token: go to “Settings > API keys” and switch to the “Content management tokens” tab; generate a personal token and make sure to immediately copy it

- Environment: You can set up multiple environments, but this is another story. We use the default for now.

Check .env.example for reference


Update package.json and add a script

add getContentfulEnvironment.js file

npm run generate:types

Now you should now find a file called contentful.d.ts in a src/@types folder containing interfaces describing the article fields.

npm i -D @contentful/rich-text-react-renderer

Update pages/index.tsx as per the instructions in the article.

Now you can deploy to Netlify or Vercel.


The is the next tutorial in the series [CMS-Driven Content Structure for a Static Next.js Site](https://www.scale.at/blog/cms-driven-content-structure-nextjs)


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
