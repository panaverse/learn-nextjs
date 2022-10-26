# Global State Management - with Context API

Read pages 117-127 of Chapter 5 of the [Real World Next.js](https://www.packtpub.com/product/real-world-next-js/9781801073493)

To Create Project give the following command:

npx create-next-app step23_globall_state_managemet_with_contex --ts

Create the components/Counter.tsx and pages/index.tsx file

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

## step 1 (Create context file)
Create a new file at components/context/cartContext.ts and populate it with the give code.

```bash
import { createContext } from 'react';
const ShoppingCartContext = createContext({
    items: {},
    setItems: () => null,
});
export default ShoppingCartContext;
```


## step 2 (Customize _app.ts file)
To access a give state in all the components, we have to wrap the component tag with CartContext.Provider and pass all the variables in value parament in form of an object. Update the _app.ts file with the given code.

```bash
import { useState } from 'react';
import CartContext from '../components/context/cartContext';

function MyApp({ Component, pageProps }) {
    const [items, setItems] = useState({});
    return (
    <CartContext.Provider value={{ items, setItems }}>
            <Component {...pageProps} />
    </CartContext.Provider>
    );
}
export default MyApp;
```

## step 3 (Access state in any component)
To access the state in any component, first import useContext hook and cartContext from react and cartContext.ts file. Then call the useContext hook with context as parameter. It will return all the state variables.

```bash
import { useContext } from 'react';
import cartContext from '../components/context/cartContext';

// inside the function
const { setItems, items } = useContext(cartContext);
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
