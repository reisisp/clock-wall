import React from 'react';
import styles from './Close.module.scss';


export const Close = ({ children, ...props }) => {
    return (
        <button {...props} className={styles.close}></button>
    );
};
