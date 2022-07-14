import { NextPage } from 'next';
import AllItems from '../components/AllItems';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.homepage}>
      <div>
        <h1 className={styles.title}> Welcome to the SCSS examples </h1>
        <AllItems />
      </div>
    </div>
  );
}

export default Home
