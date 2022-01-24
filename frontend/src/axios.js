import axios from 'axios';

// defines axios base url
const instance = axios.create({
    baseURL: 'http://localhost:9000',
});

export default instance
