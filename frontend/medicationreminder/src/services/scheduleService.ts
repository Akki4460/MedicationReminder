import axios from 'axios';

const API_URL = 'http://localhost:5000/api/medicines'; // Replace with your backend URL

// Create a new medicine schedule
export const setMedicineSchedule = async (schedule: { 
  name: string; 
  dosage: string; 
  schedule_time: string; 
  repeat_interval: string; 
}) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication required.');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.post(API_URL, schedule, { headers });
  return response.data;
};

// Update an existing medicine schedule
export const updateMedicineSchedule = async (
  id: number, 
  schedule: { 
    name: string; 
    dosage: string; 
    schedule_time: string; 
    repeat_interval: string; 
  }
) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication required.');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.put(`${API_URL}/${id}`, schedule, { headers });
  return response.data;
};

// Get all medicine schedules
export const getMedicines = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication required.');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.get(API_URL, { headers });
  return response.data;
};

// Delete a specific medicine schedule
export const deleteMedicineSchedule = async (id: number) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication required.');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.delete(`${API_URL}/${id}`, { headers });
  return response.data;
};
