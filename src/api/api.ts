import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://proud-ant-glasses.cyclic.app',
    withCredentials: true,    
});

export default instance;