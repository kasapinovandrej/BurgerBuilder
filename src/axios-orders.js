import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burgerapp-4a041-default-rtdb.firebaseio.com'
});

export default instance;