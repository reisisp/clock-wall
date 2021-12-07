import React, { useState } from "react";
import { ClockList } from "../ClockList/ClockList";
import { ClockForm } from "../ClockForm/ClockForm";
import styles from './Clocks.module.scss';
import { TimezoneContext } from "../../context/TimezoneContext";

export const Clocks = () => {
    const timezones = [
        { timezone: 'UTC-10:00', name: 'Гаваи' },
        { timezone: 'UTC-09:00', name: 'Аляска' },
        { timezone: 'UTC-08:00', name: 'США' },
        { timezone: 'UTC-07:00', name: 'Аризона' },
        { timezone: 'UTC-06:00', name: 'Мехико' },
        { timezone: 'UTC-05:00', name: 'Гаити' },
        { timezone: 'UTC-04:00', name: 'Каракас' },
        { timezone: 'UTC-03:00', name: 'Сальвадор' },
        { timezone: 'UTC-01:00', name: 'Кабо-Верде' },
        { timezone: 'UTC+00:00', name: 'Дублин' },
        { timezone: 'UTC+01:00', name: 'Амстердам' },
        { timezone: 'UTC+02:00', name: 'Вильнюс' },
        { timezone: 'UTC+03:00', name: 'Москва' },
        { timezone: 'UTC+04:00', name: 'Баку' },
        { timezone: 'UTC+05:00', name: 'Екатеринбург' },
        { timezone: 'UTC+06:00', name: 'Омск' },
        { timezone: 'UTC+07:00', name: 'Новосибирск' },
        { timezone: 'UTC+08:00', name: 'Гонконг' },
        { timezone: 'UTC+09:00', name: 'Токио' },
        { timezone: 'UTC+10:00', name: 'Владивосток' },
        { timezone: 'UTC+11:00', name: 'Сахалин' },
        { timezone: 'UTC+12:00', name: 'Фиджи' }
    ];

    const checkLocal = localStorage.getItem('local');
    if (!checkLocal) {
        localStorage.setItem('local', JSON.stringify([]));
    }
    let local = JSON.parse(localStorage.getItem('local'));

    const [clocks, setClocks] = useState(local);

    const createClock = (newClock) => {
        if (!local) {
            local = [newClock];
        } else {
            local = [...local, newClock];
        }
        localStorage.setItem('local', JSON.stringify(local));
        setClocks([...clocks, newClock])
    }

    const removeClock = (clock) => {
        localStorage.setItem('local', JSON.stringify(local.filter(el => el.id !== clock.id)));
        setClocks(clocks.filter(cl => cl.id !== clock.id))
    }

    return (
        <TimezoneContext.Provider value={timezones}>
            <div className={styles.container}>
                <ClockForm create={createClock} />
                <ClockList remove={removeClock} clocks={clocks} />
            </div>
        </TimezoneContext.Provider>
    )
}
