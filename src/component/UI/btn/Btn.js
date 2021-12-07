import React from 'react';
import styles from './Btn.module.scss';


export const Btn = ({ children, ...props }) => {
    return (
        <button {...props} className={styles.btn}>
            <span className={styles.btn__text}>
                {children}
            </span>
        </button>
    );
};
