import axios from "axios";

const Interceptor = axios.create({
    baseURL: 'http://localhost:5000',
    // baseURL: 'https://ems-backend-1-agcl.onrender.com',
    withCredentials: true
})

export default Interceptor