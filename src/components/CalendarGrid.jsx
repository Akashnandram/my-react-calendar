import React from 'react';
import './CalendarGrid.css';

const weekDayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getStartingBlankDays = (days) => {
  if (days.length === 0) return 0;
  const firstDay = new Date(days[0].year, days[0].month - 1, days[0].day);
  return firstDay.getDay();
};

const groupIntoWeeks = (days) => {
  const blanks = getStartingBlankDays(days);
  const paddedDays = Array(blanks).fill(null).concat(days);

  while (paddedDays.length % 7 !== 0) {
    paddedDays.push(null);
  }

  const weeks = [];
  for (let i = 0; i < paddedDays.length; i += 7) {
    weeks.push(paddedDays.slice(i, i + 7));
  }

  return weeks;
};

const CalendarGrid = ({ days }) => {
  const weeks = groupIntoWeeks(days);

  const getWeekColorClass = (week) => {
    const hasDates = week.some((day) => day !== null);
    if (!hasDates) return ''; // No color if no dates

    const holidayCount = week.filter((day) => day && day.festivals.length > 0).length;
    if (holidayCount === 1) return 'bg-success-subtle';
    if (holidayCount >= 2) return 'bg-success text-white';
    return 'bg-white';
  };

  return (
    <div className="container mt-4">
      <div className="p-3 border rounded shadow bg-white">
        {/* Weekday Labels */}
        <div className="calendar-grid mb-3">
          {weekDayLabels.map((day, i) => (
            <div key={i} className="weekday-box text-center fw-bold py-2 bg-light border rounded shadow-sm">
              {day}
            </div>
          ))}
        </div>

        {/* Week Rows */}
        {weeks.map((week, wIdx) => {
          const weekColorClass = getWeekColorClass(week);

          return (
            <div className="calendar-grid mb-3" key={wIdx}>
              {week.map((day, dIdx) => (
                <div key={dIdx}>
                  <div
                    className={`p-2 h-100 rounded-3 shadow ${weekColorClass}`}
                    style={{ minHeight: '100px' }}
                  >
                    {day ? (
                      <>
                        <div className="fw-bold">{day.day}</div>
                        {day.festivals.length > 0 && (
                          <ul className="list-unstyled small mt-2 mb-0">
                            {day.festivals.map((f, i) => (
                              <li key={i}>🎉 {f}</li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
