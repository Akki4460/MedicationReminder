import axios, { AxiosInstance } from 'axios';

interface Filters {
  patient_id?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
}

interface Log {
  id: string;
  user_id: string;
  medicine_id: string;
  status: string;
  timestamp: string;
}

interface LogsResponse {
  message: string;
  data: Log[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

const createApiClient = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
  });

  // Attach the token to every request
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

const apiClient = createApiClient('http://localhost:5000');

// Function to fetch acknowledgment logs
export const getAcknowledgmentLogs = async (filters: Filters): Promise<LogsResponse> => {
  try {
    const response = await apiClient.get<LogsResponse>('/admin/acknowledgment-logs', {
      params: filters,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching acknowledgment logs:', error.response?.data || error.message);
    throw error.response?.data || { message: 'An unknown error occurred' };
  }
};
