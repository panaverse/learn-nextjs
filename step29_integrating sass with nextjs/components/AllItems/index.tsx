import Buttons from './Buttons';
import List from '../List';
import Paragraph from "../Paragraph";
import Paragraph2 from "../Paragraph/Paragraph2";
import styles from "./AllItems.module.scss";

const index = () => {
  return (
    <div className={styles.container}>
      <Buttons />
      <hr/>
      <List />
      <hr/>
      <Paragraph />
      <Paragraph2 />
    </div>
  )
}

export default index