import React from 'react';
import { Clock } from '../Analog/Clock';
import styles from './ClockList.module.scss';

export const ClockList = ({ clocks, remove }) => {
    return (
        <div className={styles.clocklist}>
            {
                clocks.map(clock =>
                    <Clock remove={remove} clock={clock} key={clock.id} />
                )
            }
        </div>
    )
}


