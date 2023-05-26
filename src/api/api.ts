import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://proud-ant-glasses.cyclic.app'
});

export default instance;