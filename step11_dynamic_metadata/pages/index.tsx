import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Widget from '../components/Widget';

const HomePage: NextPage = () => {
  return (
      <>
      <Head>
        <title> Welcome to my Next.js website - Original Title</title>
      </Head>
      <div>
        <Link href='/about' passHref><a>About us</a></Link>
      </div>
      <div>
        <Widget pageName='index' />
      </div>
      </>
  )
}

export default HomePage
