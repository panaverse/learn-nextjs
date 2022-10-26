import React from 'react'
import styles from "./Variables.module.scss";

const index = () => {
    return (
        <div > 
            <div>Classes formed by Variables</div>
            <div className={styles.container}> 
                <button className={styles.button1}> Button 1 </button>
                <button className={styles.button2}> Button 2 </button>
                <button className={styles.button3}> Button 3 </button>
            </div>
        </div>
    )
}

export default index