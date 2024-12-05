import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const registerUser = async (data: { name: string; email: string; password: string; role: string }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Registration failed';
  }
};


export const loginUser = async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      return response.data; // Assuming the response contains the token, role, and id
    } catch (error: any) {
      throw error.response?.data?.message || 'Login failed';
    }
  };