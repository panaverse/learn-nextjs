import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title> About this website </title>
      </Head>
      <div>
        <Link href='/'passHref>
        <a>Back to home</a>
        </Link>
      </div>
    </>
  )
}

export default AboutPage