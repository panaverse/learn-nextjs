import Image from 'next/image'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="wrapper">
      <div className="profile flex items-center even:flex-row-reverse even:text-right">
        <Image src="https://images.pexels.com/photos/7242908/pexels-photo-7242908.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150" className="profile-img" alt="" width={150} height={150}/>
        <div>
          <h3>
            Alexa Kardi
          </h3>
          <p className="role">Founder and CEO</p>
          <p className="desc">
            Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
          </p>
        </div>
      </div>
      <div className="profile flex items-center even:flex-row-reverse even:text-right">
        <Image src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150" className="profile-img" width={150} height={150} alt=""/>
        <div>
          <h3>
            Tavell Monroe
          </h3>
          <p className="role">Web Developer</p>
          <p className="desc">
            Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.
          </p>
        </div>
      </div>
    </div>
  )
}
