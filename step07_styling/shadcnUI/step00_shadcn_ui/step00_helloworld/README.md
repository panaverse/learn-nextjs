To understand why we are using Shadcb UI watch [CSS in 2023 - Tailwind vs MUI vs Bootstrap vs Chakra vs...](https://www.youtube.com/watch?v=CQuTF-bkOgc). Go to time 4 min and see the diagram. We want to to be at the intersection of all three circles. 

[Read Introduction](https://ui.shadcn.com/docs)
   
    npx create-next-app@latest
   
    npx shadcn-ui init
    
    Note: Replace the content array in tailwind.config.js
    
    content: [
    	'./src/**/*.{ts,tsx}',
    	'./components/**/*.{ts,tsx}',
    ],

    npx shadcn-ui add card

    npx shadcn-ui add button

    npx shadcn-ui add separator

    npx shadcn-ui add switch

Edit components/MyCard.tsx

Edit src/app/page.tsx

## Note: Use Shadcn UI as a starting point. Then build your own. 




This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
