import React from 'react';
import './CalendarGrid.css';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getStartingBlankDays = (days) => {
    if (days.length === 0) return 0;
    const firstDay = new Date(days[0].year, days[0].month - 1, days[0].day);
    return firstDay.getDay();
};

const groupIntoWeeks = (days) => {
    const blanks = getStartingBlankDays(days);
    const paddedDays = Array(blanks).fill(null).concat(days);

    const weeks = [];
    for (let i = 0; i < paddedDays.length; i += 7) {
        weeks.push(paddedDays.slice(i, i + 7));
    }

    return weeks;
};

const CalendarGrid = ({ days }) => {
    const weeks = groupIntoWeeks(days);

    const getWeekColor = (week) => {
        const festivalCount = week.filter(
            (day) => day && day.festivals && day.festivals.length > 0
        ).length;

        if (festivalCount === 0) return 'grey';
        if (festivalCount === 1) return 'light-green';
        return 'dark-green';
    };

    return (
        <div className="calendar-container">
            <div className="weekdays-row">
                {weekDays.map((day) => (
                    <div key={day} className="weekday-cell">{day}</div>
                ))}
            </div>

            {weeks.map((week, idx) => {
                const weekColor = getWeekColor(week);
                return (
                    <div className="calendar-grid" key={idx}>
                        {week.map((day, i) => (
                            <div
                                key={i}
                                className={`day-box ${weekColor}`}
                            >
                                {day ? (
                                    <>
                                        <div className="day-number">{day.day}</div> {}
                                        {day.festivals.length > 0 && (
                                            <ul className="festival-list">
                                                {day.festivals.map((f, i) => (
                                                    <li key={i}>{f}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : null}

                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default CalendarGrid;
