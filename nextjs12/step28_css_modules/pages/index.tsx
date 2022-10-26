import { NextPage } from 'next';
import AllButtons from '../components/AllButtons';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.homepage}>
      <div>
        <h1> Welcome to the CSS Modules example </h1>
        <AllButtons />
      </div>
    </div>
  );
}

export default Home
