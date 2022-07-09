import React from 'react'
import styles from "./List.module.scss";

const List = () => {
    return (
        <div className={styles.listContianer}>
            List with nested CSS
            <div className={styles.list}>
                <ul>
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                </ul>
            </div>
        </div>
    )
}

export default List