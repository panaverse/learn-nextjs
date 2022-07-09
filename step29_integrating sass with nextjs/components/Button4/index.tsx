import React from 'react'
import styles from "./Button4.module.scss"

const Button = () => {
  return (
    <div className="container">
      <button className={styles.success}>Nested</button>
      <p className="textContainer"> css applied from Component-Level Nested class </p>
    </div>
  )
}

export default Button