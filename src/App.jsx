import React, { useState, useEffect } from 'react';
import CalendarGrid from './components/CalendarGrid';
import { fetchHolidays } from './services/api';

const countries = [
  { name: 'India', code: 'IN' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'United States', code: 'US' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Japan', code: 'JP' },
  { name: 'China', code: 'CN' },
  { name: 'Brazil', code: 'BR' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'Italy', code: 'IT' },
  { name: 'Spain', code: 'ES' },
  { name: 'Russia', code: 'RU' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Singapore', code: 'SG' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Sweden', code: 'SE' }
];

function App() {
  const [calendar, setCalendar] = useState([]);
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(6);
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
    <>
      {/* Top Navbar with Logo */}
      <nav className="navbar navbar-light bg-light shadow-sm mb-4">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src={`${process.env.PUBLIC_URL}/calendar-icon.png`}
              alt="Logo"
              width="32"
              height="32"
              className="me-2"
            />
            <span className="fs-5 fw-bold">Holiday Calendar</span>
          </a>
        </div>
      </nav>

      {/* Main App UI */}
      <div className="container py-4">
        <div className="row g-3 justify-content-center mb-4">
          <div className="col-12 col-sm-4 col-md-3">
            <label className="form-label">Country:</label>
            <select
              className="form-select"
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

          <div className="col-6 col-sm-4 col-md-3">
            <label className="form-label">Year:</label>
            <select
              className="form-select"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {Array.from({ length: 36 }, (_, i) => 2000 + i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="col-6 col-sm-4 col-md-3">
            <label className="form-label">Month:</label>
            <select
              className="form-select"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
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
    </>
  );
}

export default App;
