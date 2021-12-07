import React, { useState, useContext } from 'react';
import { TimezoneContext } from '../../../context/TimezoneContext';
import cn from 'classnames';
import styles from './TzEdit.module.scss';


export const TzEdit = (props) => {
    const timezones = useContext(TimezoneContext);

    const [visible, setVisible] = useState(false);
    const [tz, setTz] = useState('');

    const showTz = () => {
        setVisible(!visible);
    }

    const selectTz = (event) => {
        props.onChange(event);
        setTz(event.currentTarget.textContent);
    }

    return (
        <div className={styles.container}>
            <div className={visible === true
                ? cn(styles.select, styles.isactive)
                : styles.select} onClick={showTz}
            >
                <div className={styles.select__header}>
                    <div className={styles.select__icon}></div>
                    <span className={tz !== false
                        ? styles.select__selected
                        : styles.select__current
                    }></span>
                </div>
                <div className={styles.select__body}>
                    {timezones.map((tz, index) =>
                        <div key={index} className={styles.select__item} onClick={selectTz}>({tz.timezone})&nbsp;{tz.name}</div>
                    )}
                </div>
            </div>
        </div>
    );
};
