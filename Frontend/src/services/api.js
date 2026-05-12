import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5024', 
    withCredentials: true //allows the HTTP-only cookie to be sent
});

export default api;