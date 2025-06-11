// src/services/api.js
import axios from 'axios';

const API_BASE = 'https://backend-calendar-app-production-66bc.up.railway.app/calendar';

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
