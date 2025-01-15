import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import posts from '../data/posts';
const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to the blog home page!" />
      </Head>
      <div>
        <h1>Welcome to the Blog</h1>
        <p>Explore our latest posts:</p>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default HomePage
