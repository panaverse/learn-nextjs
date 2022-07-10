import React from 'react'
import styles from "./Modules.module.scss";

const index = () => {
    return (
        <div>
            <div>Classes formed by Modulur scss </div>
            <div className={styles.container}>
                <button className={styles.default}> Default </button>
                <button className={styles.info}> Info </button>
                <button className={styles.alert}> Alert </button>
                <button className={styles.success}> Success </button>
            </div>
        </div>
    )
}

export default index