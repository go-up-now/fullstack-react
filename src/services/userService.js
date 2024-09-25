import axios from '../axios';

const handleLoginAPI = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUsers = () => {
    return axios.get('/api/users')
}

export {
    handleLoginAPI, getAllUsers
}