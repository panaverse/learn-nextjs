# Building an employee directory with Chakra UI and Next.js

Read pages 160-175 Chapter 7 of the [Real World Next.js](https://www.packtpub.com/product/real-world-next-js/9781801073493)

npx create-next-app step32_chakra_ui_employee_directory --ts

yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4 @chakra-ui/icons

create pages/_document.tsx, update pages/index.tsx and pages/_app.tsx

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Further resources
- If you want to dig deeper into all the existing components, hooks, and utilities, you can learn more at [Chakra-ui Official Documentation](https://chakra-ui.com).
- [Chakra-ui Crash Course](https://www.youtube.com/playlist?list=PLDIXF8nb0VG174PlQuej1su71AvR1JHoo)
- [How to Use Chakra UI with Next.js and React](https://www.freecodecamp.org/news/how-to-use-chakra-ui-with-next-js-and-react/)
- [Learn Chakra-ui by building a Todo Application](https://www.youtube.com/watch?v=QVnkGqEsbK0)


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
