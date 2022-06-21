import type { NextPage } from 'next';
import NavBar from '../components/NavBar'

const HomePage: NextPage = () => {
  return (
    <div>
      <NavBar></NavBar>
      This is the Home Page.
    </div>
  )
}

export default HomePage
