import React, { useState, useEffect } from "react";
import { Btn } from "../UI/btn/Btn";
import { TzSelect } from "../UI/selector/TzSelect";
import { v4 as uuidv4 } from 'uuid';
import styles from './ClockForm.module.scss';

export const ClockForm = ({ create }) => {
    const [clock, setClock] = useState({
        name: '',
        timezone: ''
    })

    const clockHandler = (e) => {
        const selected = e.currentTarget.textContent.split(/\s/);
        setClock({ ...clock, name: selected[1], timezone: selected[0] })
    }

    const [valid, setValid] = useState(false);

    useEffect(() => {
        if (!clock.timezone || !clock.name) {
            setValid(false);
        } else {
            setValid(true);
        }
    }, [clock.timezone, clock.name])

    const addClock = (e) => {
        e.preventDefault();
        const newClock = {
            ...clock, id: uuidv4()
        };
        create(newClock);
    }

    return (
        <div className={styles.clockform}>
            <div className={styles.clockform__select}>
                <TzSelect onChange={e => clockHandler(e)} />
            </div>
            <div className={styles.clockform__btn}>
                <Btn disabled={!valid} onClick={addClock}>Добавить</Btn >
            </div>
        </div>
    )
}


