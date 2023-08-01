# Hello World with Next.js 13 and Tailwind CSS

## Setup

First, read [getting started with Next.js 13](https://nextjs.org/docs) and read [installing Tailwind CSS with Next.js 13](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css):

```bash
npx create-next-app@latest
```

You just need to select Yes when Next.js ask you to add tailwind

[Follow the Official Docs of using Tailwind CSS with Next.js 13](https://beta.nextjs.org/docs/styling/tailwind-css)

You will be getting errors in app/global.css file. Read [How to fix Unknown at rule `@tailwindcss(unknownAtRules)` in VS Code](https://flaviocopes.com/fix-unknown-at-rule-tailwind/) to correct this.

[Install Tailwind CSS Intellisense Extension in VSCode](https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code)


Now, run the development server:

```bash
npm run dev
```



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
