import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generatePortfolio = async (prompt: string) => {
  try {
    const response = await api.post('/chat', { messages: prompt });
    return response.data;
  } catch (error) {
    console.error('Error generating portfolio:', error);
    throw error;
  }
};

export const getRepositories = async () => {
  try {
    const response = await api.get('/getrepo');
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

export default api; 