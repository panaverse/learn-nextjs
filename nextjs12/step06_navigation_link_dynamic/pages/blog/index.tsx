import type { NextPage } from 'next';
import Link from 'next/link';

const PostsPage: NextPage = () => {
  return (
    <div>
      This is the Blogs Page.
      <ul>
        <li><Link href='/blog/2021-01-01/happy-new-year'> Read blog 1 </Link></li>
        <li><Link href='/blog/2021-03-05/match-update'> Read blog 2 </Link></li>
        <li><Link href={{
            pathname: '/blog/[date]/[slug]',
            query: {
              date: '2020-01-01',
              slug: 'happy-new-year',
              foo: 'bar'
            }
          }}> Read blog 3</Link></li>
      </ul>
    </div>
  )
}

export default PostsPage