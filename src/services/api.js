// src/services/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:8080/calendar';

export const fetchHolidays = async (country, year, month) => {
  const payload = {
    county: country,
    year,
    month
  };
  const response = await axios.post(`${API_BASE}/holidays`, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};
