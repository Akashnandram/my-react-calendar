import React, { useState, useEffect } from 'react';
import CalendarGrid from './components/CalendarGrid';
import { fetchHolidays } from './services/api';

const countries = [
  { name: 'India', code: 'IN' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'United States', code: 'US' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  // Add more as needed
];

function App() {
  const [calendar, setCalendar] = useState([]);
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(1);
  const [countryCode, setCountryCode] = useState('IN');

  const loadHolidays = async () => {
    try {
      const data = await fetchHolidays(countryCode, year, month);
      setCalendar(data);
    } catch (err) {
      console.error('Error fetching holidays:', err);
    }
  };

  useEffect(() => {
    loadHolidays();
  }, [countryCode, year, month]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Holiday Calendar</h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label>Country: </label>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Year: </label>
          <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {[2023, 2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Month: </label>
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {new Date(0, m - 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
      </div>

      <CalendarGrid days={calendar} />
    </div>
  );
}

export default App;
