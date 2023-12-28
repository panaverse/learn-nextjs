import Link from "next/link";

const Home = () => {
  return (
    <div className="flex w-full mt-20 justify-center items-center flex-col">
      <h1>Home</h1>
      <h2>
        Click on{" "}
        <Link href={"/blog"} className="text-blue-500">
          here!{" "}
        </Link>
        to experience Loading UI
      </h2>
    </div>
  );
};
export default Home;
