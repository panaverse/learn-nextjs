import React from 'react'
import styles from './Button2.module.css';

const Button = () => {
  return (
    <div className="container">
      <button className={styles.button}>Local</button>
      <p className="textContainer"> css applied from Component-Level </p>
    </div>
  )
}

export default Button