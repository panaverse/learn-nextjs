import Image from 'next/image'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="card flex flex-col justify-between items-start">
    <Image src="https://res.cloudinary.com/thirus/image/upload/v1629308145/logos/quote-left_tsopjj_zviayy.svg" alt="" width={50} height={50}/>
    <p>
      I just finished my trial period and was so amazed with the support and good results that I purchased the Pro version for my business.
    </p>
    <span>John Doe</span>
  </div>
  )
}
