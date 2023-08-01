import Image from 'next/image'
import panaversePic from '../public/panaverse.png';
//https://beta.nextjs.org/docs/optimizing/images

export default function Page() {
  return (
    <div className="flex">
      <div>
        <Image src={panaversePic} width={80} height={80} alt='music' />
      </div>
    <div>
      <h1>Welcome to Panaverse</h1>
      <h2>A Community of Web 3 and Metaverse Developers</h2>
      <button>Learn More</button>
    </div>
    </div>
  )
}
