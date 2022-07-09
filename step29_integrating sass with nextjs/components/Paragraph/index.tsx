import React from 'react'
import styles from "./Paragraph.module.scss";

const index = () => {
  return (
    <div className={styles.paragraphContianer}>
        Text with variable in CSS
        <p className={styles.paragraph}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat architecto quasi expedita.
        </p>
    </div>
  )
}

export default index