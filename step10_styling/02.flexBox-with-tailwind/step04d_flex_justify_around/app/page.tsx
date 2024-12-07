import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="container flex justify-around">
  <div className="team-profile">
    <Image src="https://images.pexels.com/photos/7242908/pexels-photo-7242908.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150" className="team-img" width={150} height={150} alt="image"/>
    <h3>Alexa Kardi</h3>
    <p>Founder and CEO</p>
  </div>
  <div className="team-profile">
    <Image src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150" className="team-img" width={150} height={150} alt="image"/>
    <h3>Tavell Monroe</h3>
    <p>Web Developer</p>
  </div>
  <div className="team-profile">
    <Image src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150" className="team-img" width={150} height={150} alt="image"/>
    <h3>Adale Smith</h3>
    <p>Marketing Specialist</p>
  </div>
  <div className="team-profile">
    <Image src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=300" className="team-img" width={150} height={150} alt="image"/>
    <h3>Thomas Mason</h3>
    <p>UX Designer</p>
  </div>
</div>


  )
}
