import React from 'react'
import styles from "./Paragraph2.module.scss";

const index = () => {
  return (
    <div className={styles.paragraphContianer}>
        Text with Modular CSS
        <p className={styles.paragraph2}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat architecto quasi expedita.
        </p>
    </div>
  )
}

export default index