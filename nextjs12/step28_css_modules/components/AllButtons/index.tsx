import React from 'react'
import Button1 from '../Button1'
import Button2 from '../Button2'
import Button3 from '../Button3'
import styles from "./AllButtons.module.css";

const AllButtons = () => {
  return (
    <div className={styles.container}>
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  )
}

export default AllButtons