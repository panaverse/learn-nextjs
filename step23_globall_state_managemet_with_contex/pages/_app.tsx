import { useState } from 'react';
import Head from 'next/head';
import CartContext from '../components/context/cartContext';
import Navbar from '../components/Navbar';
import { AppProps } from 'next/app';
import { Item } from '../components/context/types';

const MyApp = ({ Component, pageProps }: AppProps) =>  {
  const [items, setItems] = useState<{[item: string]: Item}>({});

  return (
    <>
      <Head>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <CartContext.Provider value={{ items, setItems }}>
        <Navbar />
        <div className="w-9/12 m-auto pt-10">
          <Component {...pageProps} />
        </div>
      </CartContext.Provider>
    </>
  );
}

export default MyApp;