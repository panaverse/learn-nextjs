import { BlogDataType, wait } from "../page";

const data = async ({ id }: { id: string }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  await wait(2000);

  return res.json();
};

const SinglePost = async ({ params }: { params: { id: string } }) => {
  const post: BlogDataType = await data(params);
  return (
    <main className="flex flex-col gap-3 items-center justify-center mx-auto mt-10 max-w-2xl">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
};
export default SinglePost;
