import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Widget from '../components/Widget';

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title> About this website - Original Title</title>
      </Head>
      <div>
        <Link href='/'passHref><a>Back to home</a></Link>
      </div>
      <div><Widget pageName='about' /></div>
    </>
  )
}

export default AboutPage