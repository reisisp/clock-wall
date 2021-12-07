import React, { useState, useEffect } from "react";
import moment from 'moment';
import { Close } from "../UI/btn/Close";
import styles from './Clock.module.scss';
import { TzEdit } from "../UI/selector/TzEdit";

export const Clock = (props) => {
    const [clock, setClock] = useState(props.clock);

    let [second, setSecond] = useState(moment().seconds());
    let [minute, setMinute] = useState(moment().minutes());
    let [hour, setHour] = useState(moment().utcOffset(clock.timezone).hours());

    let local = JSON.parse(localStorage.getItem('local'));

    const saveHandler = (e) => {
        const selected = e.currentTarget.textContent.split(/\s/);
        setClock({ ...clock, timezone: selected[0], name: selected[1] })
        setHour(moment().utcOffset(selected[0]).hours());
     
        const index = local.map(e => e.id).indexOf(props.clock.id);

        local[index].timezone = selected[0];
        local[index].name = selected[1];
        localStorage.setItem('local', JSON.stringify(local));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSecond(moment().seconds());
            if (second >= 59) setMinute(moment().minutes());
            if (minute >= 59) setHour(moment().utcOffset(clock.timezone).hours());
        }, 1000);
        return () => clearInterval(interval);
    }, [second, minute, hour, clock.timezone]);


    return (
        <div className={styles.container}>
            <div className={styles.clock}>
                <h1 className={styles.clock__timezone}>{clock.name || 'TimeZone'}</h1>
                <div className={styles.clock__container}>
                    <div className={styles.clock__arrows}>
                        <div className={styles.clock__middle}></div>
                        <div className={styles.clock__hour}
                            style={{ transform: 'rotate(' + (90 + (hour * 60 + minute) / 2) + 'deg)' }}
                        >
                            <div className={styles.visible}></div>
                            <div className={styles.invisible}></div>
                        </div>
                        <div className={styles.clock__minute}
                            style={{ transform: 'rotate(' + (90 + (minute * (360 / 60))) + 'deg)' }}
                        >
                            <div className={styles.visible}></div>
                            <div className={styles.invisible}></div>
                        </div>
                        <div className={styles.clock__second}
                            style={{ transform: 'rotate(' + (90 + (second * (360 / 60))) + 'deg)' }}
                        >
                            <div className={styles.visible}></div>
                            <div className={styles.invisible}></div>
                        </div>
                    </div>
                </div>
                <div>
                    <Close onClick={() => props.remove(clock)} />
                    <TzEdit timezone={clock.name} onChange={e => saveHandler(e)} />
                </div>
            </div>
        </div >
    )
}