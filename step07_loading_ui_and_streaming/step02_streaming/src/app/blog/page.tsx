import Views from "@/components/Views";
import { wait } from "@/components/Wait";
import Link from "next/link";
import { Suspense } from "react";

export type BlogDataType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const BlogData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  // Using wait to intentionally increase fetching time
  await wait(5000);

  return res.json();
};

const Blog = async () => {
  const data: BlogDataType[] = await BlogData();

  return (
    <main className="flex flex-col max-w-lg m-auto w-full gap-5 mt-10">
      <h1 className="font-bold text-5xl text-center">Blog Page</h1>
      {data.map((post, index) => (
        <div
          className="flex flex-col h-56 justify-center gap-1 border border-gray-500 rounded-lg p-5 bg-blue-300"
          key={index}
        >
          <h2>UserId: {post.id}</h2>
          <p>Title: {post.title}</p>
          <Link href={`/blog/${post.id}`}>Read More...</Link>

          {/* Suspense */}
          <Suspense
            fallback={<p className="text-sm text-gray-700">Loading Views...</p>}
          >
            <Views />
          </Suspense>
          <br />
          <br />
        </div>
      ))}
    </main>
  );
};
export default Blog;
