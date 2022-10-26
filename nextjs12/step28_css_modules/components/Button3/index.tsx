import React from 'react'
import styles from "./Button3.module.css"

const Button = () => {
  return (
    <div className="container">
      <button className={styles.composedButton}>Composed</button>
      <p className="textContainer"> css applied from Component-Level Composed class </p>
    </div>
  )
}

export default Button