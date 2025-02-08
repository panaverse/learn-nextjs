{/* @ts-expect-error Async Server Component */}
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

async function getBlogs() {
  const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=blog`);
  
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const blogs = await getBlogs();
  return (
    <ul>
      {blogs.items.map((item: any) => (
        <li>{item.fields.name}</li>
      ))}
    </ul>
  )
}
