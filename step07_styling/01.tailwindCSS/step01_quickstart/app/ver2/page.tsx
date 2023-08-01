import Image from "next/image";
import panaversePic from "../../public/panaverse.png";
//https://beta.nextjs.org/docs/optimizing/images

export default function Page() {
  return (
    <div className="flex justify-center bg-gray-300">
      <div className="mx-4 order-last self-center">
        <Image src={panaversePic} width={80} height={80} alt="music" />
      </div>
      <div className="mx-4 self-center text-center">
        <h1 className="text-6xl font-bold text-blue-700">
          Welcome to Panaverse
        </h1>
        <h2 className="text-3xl font-semibold text-blue-300">
          A Community of Web 3 and Metaverse Developers
        </h2>
        <button
          className="my-4 px-4 py-2 border-2 border-black rounded-lg
text-white bg-blue-900"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
