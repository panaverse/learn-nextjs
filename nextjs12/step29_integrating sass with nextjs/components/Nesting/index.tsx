import React from 'react'
import styles from "./Nesting.module.scss";

const index = () => {
    return (
        <div >
            <div>Classes formed by Nested Classes</div>
            <div className={styles.container}>
                <div className={styles.Btncontainer}>
                    <button className={styles.button}> Button 1 </button>
                </div>

                <button className={styles.Btncontainer2 + " " + styles.button}> Button 2 </button>
                <button className={styles.Btncontainer__button}> Button 3 </button>

            </div>
        </div>
    )
}

export default index