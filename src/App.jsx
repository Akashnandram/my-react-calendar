// src/App.jsx

// src/App.jsx
import React, { useState, useEffect } from 'react';
import CalendarGrid from './components/CalendarGrid';
import { fetchHolidays } from './services/api';

const App = () => {
  const [calendar, setCalendar] = useState([]);
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(1);
  const [country, setCountry] = useState('IN');

  const loadHolidays = async () => {
    try {
      const data = await fetchHolidays(country, year, month);
      setCalendar(data);
    } catch (err) {
      console.error('Error fetching holidays:', err);
    }
  };

  useEffect(() => {
    loadHolidays();
  }, [country, year, month]);

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ];
  const countries = ['IN', 'US', 'UK', 'DE', 'FR', 'JP'];

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Holiday Calendar</h2>
  
      <div
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}
      >
        <label>
          Country:
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{ marginLeft: '8px', padding: '4px' }}
          >
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
  
        <label>
          Year:
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            style={{ marginLeft: '8px', padding: '4px' }}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>
  
        <label>
          Month:
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            style={{ marginLeft: '8px', padding: '4px' }}
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.name}</option>
            ))}
          </select>
        </label>
      </div>
  
      <CalendarGrid days={calendar} />
    </div>
  );
  
};

export default App;

