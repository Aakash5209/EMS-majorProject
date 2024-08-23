import axios from "axios";

const Interceptor = axios.create({
    baseURL: 'http://localhost:5000',
    // baseURL: 'https://ems-backend-a1g3.onrender.com',
    withCredentials: true
})

export default Interceptor