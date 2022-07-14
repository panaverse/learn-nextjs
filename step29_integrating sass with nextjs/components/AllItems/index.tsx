import Buttons from '../Buttons';
import Mixins from '../Mixins';
import Variables from '../Variables';
import Nesting from '../Nesting';
import Extending from '../Extending';
import Modules from "../Modules";
import styles from "./AllItems.module.scss";

const index = () => {
  return (
    <div className={styles.container}>
      <Buttons />
      <hr color='black' />
      <Mixins />
      <hr color='black' />
      <Variables />
      <hr color='black' />
      <Nesting />
      <hr color='black' />
      <Extending />
      <hr color='black' />
      <Modules />
      <hr color='black' />
    </div>
  )
}

export default index