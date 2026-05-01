import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5024', // Ensure this matches your .NET port
    withCredentials: true // CRITICAL: This allows the HTTP-only JWT cookie to be sent
});

export default api;