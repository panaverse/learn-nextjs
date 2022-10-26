// import 'tailwindcss/tailwind.css';

import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
