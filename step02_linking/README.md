# Next.js 13 Linking and Navigating

[Read the Linking and Navigating fundamentals docs](https://beta.nextjs.org/docs/routing/linking-and-navigating)

We will use the [Link](https://beta.nextjs.org/docs/api-reference/components/link) component to navigate between home page and name page.

We will use [useRouter() Hook](https://beta.nextjs.org/docs/api-reference/use-router) to programmatically change routes inside Name [Client Component](https://beta.nextjs.org/docs/rendering/server-and-client-components#client-components).

We should use the <Link> component for navigation unless you have a specific requirement for using useRouter.

## Steps to follow
Notice, in our app/page.tsx, we are using `<Link href="/name">Go to name page</Link>` to go to `name/page.tsx` and in app/name/page.tsx we are importing useRouter by `import { useRouter } from 'next/navigation'` then using useRouter hook to go to name/page/address/page.tsx. Also, dont forget to add `'use client'` on top of the file
```
 const router = useRouter();
    return (
      <div>
            My name is Zia.
            <br/>
            <button type="button" onClick={() => router.push('/name/address')}>
              Get Address
            </button>
      
      </div>
```

Start the Server:

        npm run dev

Open the Browser:

        http://localhost:3000/
