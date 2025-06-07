// App.js
import React, { useState, useEffect } from 'react';
import CalendarGrid from './components/CalendarGrid';
import { fetchHolidays } from './services/api';

function App() {
  const [calendar, setCalendar] = useState([]);
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(1);
  const [country, setCountry] = useState('IN');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchHolidays(country, year, month);
        setCalendar(data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h2>Holiday Calendar - {year}/{month}</h2>
      <CalendarGrid days={calendar} />
    </div>
  );
}

export default App;
