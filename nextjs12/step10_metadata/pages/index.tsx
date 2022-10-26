import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title> Welcome to my Next.js website </title>
      </Head>
      <div>
        <Link href='/about' passHref>
        <a>About us</a>
        </Link>
      </div>
    </>
  )
}

export default HomePage
