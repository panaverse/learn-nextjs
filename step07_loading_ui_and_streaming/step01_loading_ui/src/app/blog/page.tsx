import Link from "next/link";

// Function created to intentionally increase the response time
export const wait = async (ms: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};

export type BlogDataType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const BlogData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

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
          className="flex flex-col h-44 gap-1 border border-gray-500 rounded-lg p-5 bg-blue-300"
          key={index}
        >
          <h1>UserId: {post.id}</h1>
          <p>Title: {post.title}</p>
          <Link href={`/blog/${post.id}`}>Read More...</Link>
          <br />
          <br />
        </div>
      ))}
    </main>
  );
};
export default Blog;
