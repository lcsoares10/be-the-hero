import axios from 'axios';

//defino qual será a base para as requições
const api = axios.create({
    baseURL:'http://localhost:8000'
});

export default api;