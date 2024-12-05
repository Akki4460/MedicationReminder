import axios from 'axios';

const API_URL = 'http://localhost:5000/api/acknowledgment';

// Interface for acknowledgment request
interface AcknowledgmentRequest {
  medicine_id: string;
  status: 'taken' | 'not_taken';  // Status of acknowledgment
}

// Interface for acknowledgment log response
interface AcknowledgmentLogResponse {
  message: string;
  data: {
    id: string;
    user_id: string;
    medicine_id: string;
    status: 'taken' | 'not_taken';
    timestamp: string;
  };
}

// Function to get the JWT token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('token'); // Retrieve the token from localStorage
};

// Log acknowledgment when the user takes medicine
export const logAcknowledgment = async (
  medicineId: string,
  status: 'taken' | 'not_taken'
): Promise<AcknowledgmentLogResponse> => {
  const token = getToken(); // Get the token

  if (!token) {
    throw new Error('Unauthorized access: No token found');
  }

  try {
    const response = await axios.post<AcknowledgmentLogResponse>(API_URL, 
      {
        medicine_id: medicineId,
        status: status,
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error logging acknowledgment', error);
    throw error;
  }
};

// Interface for fetching acknowledgment logs by user
interface AcknowledgmentLogsByUserResponse {
  data: {
    id: string;
    user_id: string;
    medicine_id: string;
    status: 'taken' | 'not_taken';
    timestamp: string;
  }[];
}

// Fetch acknowledgment logs by user
export const getAcknowledgmentLogsByUser = async (userId: string): Promise<AcknowledgmentLogsByUserResponse> => {
  const token = getToken(); // Get the token

  if (!token) {
    throw new Error('Unauthorized access: No token found');
  }

  try {
    const response = await axios.get<AcknowledgmentLogsByUserResponse>(`${API_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching acknowledgment logs by user', error);
    throw error;
  }
};

// Interface for fetching acknowledgment logs by medicine
interface AcknowledgmentLogsByMedicineResponse {
  data: {
    id: string;
    user_id: string;
    medicine_id: string;
    status: 'taken' | 'not_taken';
    timestamp: string;
  }[];
}

// Fetch acknowledgment logs by medicine
export const getAcknowledgmentLogsByMedicine = async (medicineId: string): Promise<AcknowledgmentLogsByMedicineResponse> => {
  const token = getToken(); // Get the token

  if (!token) {
    throw new Error('Unauthorized access: No token found');
  }

  try {
    const response = await axios.get<AcknowledgmentLogsByMedicineResponse>(`${API_URL}/medicine/${medicineId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching acknowledgment logs by medicine', error);
    throw error;
  }
};
